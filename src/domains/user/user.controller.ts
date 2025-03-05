import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/access-token.guard';
import { ChangeUserEmailDto, ChangeUserEmailResponse, GetHomePageResponse } from './dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { BasicApiDecorators } from 'src/decorators/swagger.decorators';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiResponse({ status: 200, type: GetHomePageResponse })
  async getHomePage(@GetUser() user): Promise<GetHomePageResponse> {
    return await this.userService.getHomePage(user._id)
  }
    @Put()
   @BasicApiDecorators({
     responseCode: 200,
     isArray: false,
     operation: {
       summary:
         'Change User Email',
     },
     response: ChangeUserEmailDto,
     description: 'Change User Login Email',
   })
    async changeUserEmail(@GetUser() user, @Body() changeUserEmailDto: ChangeUserEmailDto) :Promise<ChangeUserEmailResponse> {
        return await this.userService.changeUserEmail(user._id,changeUserEmailDto.email)
    }
}
