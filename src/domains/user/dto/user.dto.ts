import { HttpException } from "@nestjs/common";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Card } from "src/domains/cards/entities/card.entity";
@ApiExtraModels(Card)
export class GetHomePageResponse{
    @ApiProperty({type: [Card],nullable:true})
    cards: Card[] | null;
    
}

export class ChangeUserEmailDto{
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({type:String,example:'personalEmail@gmail.com',required:true})
    email: string
}
export type ChangeUserEmailResponse = HttpException | string;