import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UserDocument } from '../user/entites/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/access-token.guard';
import mongoose, { ObjectId } from 'mongoose';
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(
    @GetUser() user: UserDocument,
    @Body() createCardDto: CreateCardDto,
  ) {
    return await this.cardsService.create(user, createCardDto);
  }
  @Get(':id/wallet-link')
  getwalletLink(@Param('id') cardId: string): Promise<String> {
    return this.cardsService.getWalletLink(cardId);
  }
  @Patch(':id')
  update(@GetUser() user: UserDocument, @Param('id') cardId: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(user._id  ,cardId, updateCardDto);
  }
  @Get()
  findAll() {
    // const ability = this.caslAbilityFactory.createForUser(new User());
    return '';
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
