import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/access-token.guard';
import { GetHomePageResponse } from './dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiResponse({ status: 200, type: GetHomePageResponse })
  getHomePage(): Promise<GetHomePageResponse> {
    return;
  }
}
