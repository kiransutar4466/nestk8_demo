import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async loginService(loginDetails: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: loginDetails.email,
        },
      });

      if (!user) {
        throw new NotFoundException('User does not exist!');
      }

      if (await bcrypt.compare(loginDetails.password, user.password)) {
        delete user['password'];

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '5h',
        });

        return {
          success: true,
          accessToken: accessToken,
          statusCode: HttpStatus.OK,
        };
      } else {
        throw new UnauthorizedException(
          'Invalid user credentials. Please try again!',
        );
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: error.message,
        statusCode: error.response.statusCode,
      });
    }
  }
}
