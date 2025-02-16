import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Card } from "src/domains/cards/entities/card.entity";
@ApiExtraModels(Card)
export class GetHomePageResponse{
    @ApiProperty({type: [Card],nullable:true})
    cards: Card[] | null;
    
}