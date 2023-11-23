import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  RegisterUserDto,
  UpdateUserDto,
  UserOutputDto,
} from './dto/register-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({
    description: 'This API Endpoint Is Used To Register User.',
  })
  @ApiResponse({ status: 201, description: 'User Register Successfully.' })
  async registerUser(@Body() userDetails: RegisterUserDto) {
    console.log(
      '🚀 ~ file: user.controller.ts:29 ~ UserController ~ registerUser ~ userDetails:',
      userDetails,
    );
    return await this.userService.registerUser(userDetails);
  }

  @Get()
  @ApiOperation({
    description: 'This API Endpoint Is Used To Get All User.',
  })
  @ApiResponse({ status: 200, type: UserOutputDto })
  async getAllUser(): Promise<UserOutputDto[]> {
    return await this.userService.GetAllUserService();
  }

  @Delete('/:id')
  @ApiOperation({
    description: 'This API Endpoint Is Used To delete User.',
  })
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUserService(userId);
  }

  @Patch('/:id')
  @ApiOperation({
    description: 'This API Endpoint Is Used To Update User.',
  })
  async updateUser(
    @Param('id') userId: string,
    @Body() userDetails: UpdateUserDto,
  ) {
    return await this.userService.updateUserService(userId, userDetails);
  }

  @Get('/:id')
  @ApiOperation({
    description: 'This API Endpoint Is Used To Get User By Id.',
  })
  async getUserById(@Param('id') userId: string) {
    return await this.userService.getUserByIdService(userId);
  }
}
