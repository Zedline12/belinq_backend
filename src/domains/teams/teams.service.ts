import { Injectable } from '@nestjs/common';
import { CreateTeamDto, CreateTeamResponseDto, TeamMemberDto } from './dto/team.dto';
import { UserService } from '../user/user.service';
import { UnregisteredUsersService } from '../unregistered-members/unregistered-members.service';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamMember, UnRegisteredTeamMember } from './entities/team.entity';
import mongoose, { Model } from 'mongoose';
import { UsersSubscriptionsService } from '../users-subscriptions/users-subscriptions.service';
import { UserDocument } from '../user/entites/user.entity';
import { SubscriptionPlanType } from '../subscription-plans/entities/subscription-plan.entity';
import { SubscriptionType } from '../users-subscriptions/entities/users-subscription.entity';
import { TeamRole } from '../auth/constants/constants';
import { CardsService } from '../cards/cards.service';
@Injectable()
export class TeamsService {
  constructor(
    private readonly userService: UserService,
    private readonly unregisteredMembersService: UnregisteredUsersService,
    private readonly userSubscriptionService: UsersSubscriptionsService,
    private readonly cardsService: CardsService,
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}
  async create(owner: UserDocument, createTeamDto: CreateTeamDto): Promise<CreateTeamResponseDto> {
    const userSubscription =
      await this.userSubscriptionService.createSubscription(
        owner._id,
        SubscriptionPlanType.TEAMS,
        SubscriptionType.ANNUAL,
      );
    const team = await this.teamModel.create({
      owner: owner._id,
    });
    const users = await this.userService.find({
      email: { $in: createTeamDto.members.map((member) => member.email) },
    });
    let unregisteredUsersData: TeamMemberDto[] = [];
    if (users.length !== createTeamDto.members.length) {
      unregisteredUsersData.push(
        ...createTeamDto.members.filter(
          (member) => !users.map((user) => user.email).includes(member.email),
        ),
      );
    }
    const unregisteredUsers:UnRegisteredTeamMember[] = await this.unregisteredMembersService.sign(
      team._id,
      unregisteredUsersData
    );
    const registeredUsers:TeamMember[] = createTeamDto.members
      .filter((member) =>
        users.map((user) => user.email).includes(member.email),
      )
      .map((member) => {
        const res= {
          ...member,
          user: users.find((user) => user.email === member.email)
            ._id,
        };
        delete res.email;
        return res
      });
    await this.cardsService.createTeamMembersCards(owner._id, team._id, registeredUsers);
    return await this.createTeam(
      owner._id,
      userSubscription._id,
      registeredUsers,
       unregisteredUsers
    );
  }
  private async createTeam(
    owner: mongoose.Types.ObjectId,
    subscription: mongoose.Types.ObjectId,
    members: TeamMember[],
    unregisteredMembers?:UnRegisteredTeamMember[],
  ): Promise<Team> {
    return await this.teamModel.create({
      owner: owner,
      subscription: subscription,
      members: members,
      unregisteredMembers: unregisteredMembers,
    });
  }
  public async getUserRole(
    userid: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId,
  ): Promise<TeamRole | null> {
    const team = await this.teamModel.findOne(teamId);

    // if (team.owner.toString() === userid.toString()) return TeamRole.TeamOwner;
    // if (team.admin.toString() === userid.toString()) return TeamRole.TeamAdmin;
    // const member = team.members.find(
    //   (member) => member.user.toString() === userid.toString(),
    // );
    // if (!member) return null;
    // if (member.access === member.role)
    //   return TeamRole.TeamMemberEditor;
    // if (member.access === TeamMemberAccess.VIEWER)
    return TeamRole.TeamMemberViewer;
  }
  findAll() {
    return this.teamModel.find();
  }
  async getAllMembers(teamId:mongoose.Types.ObjectId) {
    return await this.teamModel.findById(teamId).projection({members:1});
  }

  findOne(id: number) {
    return this.teamModel.findById(id);
  }

  // update(id: number, updateTeamDto: UpdateTeamDto) {
  //   return `This action updates a #${id} team`;
  // }

  remove(id: number) {
    return this.teamModel.deleteOne({ _id: id });
  }
}
