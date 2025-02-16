import { Injectable } from '@nestjs/common';
import { UpdateUnregisteredMemberDto } from './dto/update-unregistered-member.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UnRegisteredUser } from './entities/unregistered-member.entity';
import mongoose, { Model } from 'mongoose';
import {
  UnRegisteredTeamMember,
} from '../teams/entities/team.entity';
import { MailService } from 'src/providers/mail/mail.service';
import { TeamMemberDto } from '../teams/dto/team.dto';

@Injectable()
export class UnregisteredUsersService {
  constructor(
    @InjectModel(UnRegisteredUser.name)
    private readonly unregisteredUserModel: Model<UnRegisteredUser>,
    private readonly mailService: MailService,
  ) {}
  async create(email: string, teamId: string) {
    return await this.unregisteredUserModel.create({ email, teamId });
  }
  async sign(
    teamId: mongoose.Types.ObjectId,
    membersData: TeamMemberDto[],
  ): Promise<UnRegisteredTeamMember[]> {
    const unregisteredMembers = await this.unregisteredUserModel.find({
      email: { $in: membersData.map((user) => user.email) },
    });
    let finalResult:UnRegisteredTeamMember[] = [];
    //if there are unregistered members already
    if (unregisteredMembers) {
      //sign the _id from database and team role for parameters
      finalResult.push(
        ...unregisteredMembers.map((user) => ({
          unregisteredUser: user._id,
          ...membersData.find((memberData) => memberData.email === user.email),
        } as UnRegisteredTeamMember)),
      );
    }
    //add to their team list if found and create if not found
    const bulkOperations = membersData.map((user, index) => ({
      updateOne: {
        filter: { email: user.email }, // Find user by email
        update: { $addToSet: { teams: teamId } }, // Add new team (no duplicates)
        upsert: true,
        orignalIndex: index,
        setDefaultsOnInsert: true,
        new: true,
        // Create if not found
      },
    }));
    //      await this.mailService.send({
    //   sender: 'bedomohamed307@gmail.com',
    //   to: unregisteredUser.email,
    //   subject: 'unregistered emails',
    //   text: 'unregistered emails',
    // });
    const bulkWriteResult = await this.unregisteredUserModel.bulkWrite(
      bulkOperations,
      { ordered: true },
    );
    Object.keys(bulkWriteResult.upsertedIds).forEach((key: any) => {
      const index = parseInt(key, 10); // Convert key to integer
      finalResult.push({
        unregisteredUser: bulkWriteResult.upsertedIds[index],
        ...membersData[index],
      }); // Assign the value to the corresponding index
    });

    return finalResult;
  }
  findAll() {
    return `This action returns all unregisteredMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unregisteredMember`;
  }

  update(id: number, updateUnregisteredMemberDto: UpdateUnregisteredMemberDto) {
    return `This action updates a #${id} unregisteredMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} unregisteredMember`;
  }
}
