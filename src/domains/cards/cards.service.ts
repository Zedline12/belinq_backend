import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import mongoose, { Model, ObjectId} from 'mongoose';
import { Card, CardType } from './entities/card.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../user/entites/user.entity';
import { ConfigService } from '@nestjs/config';
import { Configration } from 'src/config/configration.interface';
import * as jwt from 'jsonwebtoken';
import { CARD_NOT_FOUND } from 'src/errors/erros.constant';
import { UserService } from '../user/user.service';
import { TeamMember } from '../teams/entities/team.entity';
@Injectable()
export class CardsService {
  private readonly googleWalletConfig: Configration['wallets']['googleWallet'];
  constructor(
    @InjectModel(Card.name) private cardModel: Model<Card>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.googleWalletConfig = this.configService.get<
      Configration['wallets']['googleWallet']
    >('wallets.googleWallet');
  }
  private generateWalletIds() {
    const timestamp = +Date; // Current timestamp for uniqueness
    const randomPart = Math.floor(Math.random() * 1e6); // Random number to avoid collision
    return `${this.googleWalletConfig.issuerId}.${timestamp}${randomPart}`;
  }
  public async getWalletLink(cardId: string): Promise<string> {
    try {
      const card = await this.getCardById(cardId);
      if (!card) throw new NotFoundException(CARD_NOT_FOUND);
      const objectId = this.generateWalletIds();
      // const newClass = {
      //   id: `${this.googleWalletConfig.issuerId}.LinqItBussinessCardTemplate`,
      //   classTemplateInfo: {
      //     cardTemplateOverride: {
      //       cardRowTemplateInfos: [
      //         {
      //           twoItems: {
      //             startItem: {
      //               firstValue: {
      //                 fields: [
      //                   {
      //                     fieldPath: "object.textModulesData['job']"
      //                   }
      //                 ]
      //               }
      //             },
      //             endItem: {
      //               firstValue: {
      //                 fields: [
      //                   {
      //                     fieldPath: "object.textModulesData['phonenumber']"
      //                   }
      //                 ]
      //               }
      //             }
      //           }
      //         },
      //         {
      //           twoItems: {
      //             startItem: {
      //               firstValue: {
      //                 fields: [
      //                   {
      //                     fieldPath: "object.textModulesData['company']"
      //                   }
      //                 ]
      //               }
      //             },
      //             endItem: {
      //               firstValue: {
      //                 fields: [
      //                   {
      //                     fieldPath: "object.textModulesData['email']"
      //                   }
      //                 ]
      //               }
      //             }
      //           }
      //         }
      //       ]
      //     }
      //   }
      // };
      let newObject = {
        id: `${objectId}`,
        classId: `${this.googleWalletConfig.issuerId}.LinqItBussinessCardTemplate`,
        logo: {
          sourceUri: {
            uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg',
          },
          contentDescription: {
            defaultValue: {
              language: 'en-US',
              value: 'LOGO_IMAGE_DESCRIPTION',
            },
          },
        },
        cardTitle: {
          defaultValue: {
            language: 'en-US',
            value: 'LinqIt',
          },
        },

        header: {
          defaultValue: {
            language: 'en-US',
            value: `${card.firstName} ${card.lastName}`,
          },
        },
        textModulesData: [
          {
            id: 'job',
            header: 'Job',
            body: `${card.jobTitle}`,
          },
          {
            id: 'phonenumber',
            header: 'Phone Number',
            body: `${card.phoneNumber}`,
          },
          {
            id: 'company',
            header: 'Company',
            body: `${card.companyName}`,
          },
          {
            id: 'email',
            header: 'Email',
            body: `${card.email}`,
          },
        ],
        barcode: {
          type: 'QR_CODE',
          value: 'BARCODE_VALUE',
          alternateText: '',
        },
        hexBackgroundColor: `${card.backgroundColor}`,
        // heroImage: {
        //   sourceUri: {
        //     uri: "https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.png"
        //   },
        //   contentDescription: {
        //     defaultValue: {
        //       language: "en-US",
        //       value: "HERO_IMAGE_DESCRIPTION"
        //     }
        //   }
        // }
      };
      // Create the JWT claims
      let claims = {
        iss: this.googleWalletConfig.issuerEmail,
        aud: 'google',
        //getting timestamp
        //  iat:+new Date,
        origins: ['http://localhost:3000'],
        typ: 'savetowallet',
        payload: {
          genericObjects: [newObject],
        },
      };

      // The service account credentials are used to sign the JWT
      let token = jwt.sign(
        claims,
        this.googleWalletConfig.serviceAccountPrivateKey,
        { algorithm: 'RS256' },
      );

      return `https://pay.google.com/gp/v/save/${token}`;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  
  public async update(userId:mongoose.Types.ObjectId, cardId: string, updateCardDto: UpdateCardDto) {
  
  }
  public async getCardById(cardId: string) {
    return await this.cardModel.findById(new mongoose.Types.ObjectId(cardId));
  }
  public async create(
    user: UserDocument,
    createCardDto: CreateCardDto,
  ): Promise<any> {
    return await this.cardModel.create({ ...createCardDto, user: user._id });
  }
  public async createTeamMembersCards(owner: mongoose.Types.ObjectId, teamId: mongoose.Types.ObjectId, teamMembers: TeamMember[]) { 
    const bulkOperations = teamMembers.map((user, index) => ({
      insertOne: {
        document: {
          owner: owner,
          type: CardType.TEAM,
          assignedTo: user.user,
          team: teamId,
          qrImageView:"https://"
       }
      },
    }));
    try {
      const result = await this.cardModel.bulkWrite(bulkOperations);
      return result;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all cards`;
  }

  async findOne(id: string) {
    const card = await this.cardModel.find(new mongoose.Types.ObjectId(id));
    return card;
  }
  async remove(cardId:string) {
    
  }
}
