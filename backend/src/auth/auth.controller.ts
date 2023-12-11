import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    description: 'This API Endpoint Is Used To Login User.',
  })
  async login(@Body() loginDetails: LoginDto, @Res() res: Response) {
    return await this.authService
      .loginService(loginDetails)
      .then((data) => res.send(data))
      .catch((error) => {
        const statusCode = error.response?.statusCode || 500; 
        const errorMessage = error.response?.message || 'Internal Server Error';
        return res.status(statusCode).send(errorMessage);
      });
  }
}
