import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  RegisterUserDto,
  UpdateUserDto,
  UserOutputDto,
} from './dto/register-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidV4 } from 'uuid';
import { EmailService } from '../email/email.service';
import { generateRandomPassword } from '../utils/utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async registerUser(userDetails: RegisterUserDto) {
    try {
      const getUser = await this.prisma.user.findUnique({
        where: { email: userDetails.email },
      });

      if (getUser) {
        throw new BadRequestException('Email already exists.');
      }

      const password = await generateRandomPassword(10);
      console.log(
        '🚀 ~ file: user.service.ts:27 ~ UserService ~ registerUser ~ password:',
        password,
      );
      userDetails.password = await bcrypt.hash(password, 10);

      const UserObject = await this.prisma.user.create({
        data: {
          ...userDetails,
          id: uuidV4(),
        },
      });

      const sendEmailObject = {
        body: {
          emailType: 'Login Password',
          toAddresses: UserObject.email,
          password: password,
          user: `${UserObject.firstName} ${UserObject.lastName}`,
          from: `ramalondhe11@gmail.com`,
        },
      };
      await this.emailService.sendEmail(sendEmailObject);

      return { message: 'User Registration successfully' };
    } catch (error) {
      console.log(
        '🚀 ~ file: user.service.ts:8 ~ UserService ~ registerUser ~ error:',
        error,
      );

      throw new BadRequestException(error.message);
    }
  }

  async GetAllUserService(): Promise<UserOutputDto[]> {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      console.log(
        '🚀 ~ file: user.service.ts:66 ~ UserService ~ GetAllUserService ~ error:',
        error,
      );
      throw new BadRequestException(error.message);
    }
  }

  async deleteUserService(userId: string) {
    try {
      const user = await this.getUserByIdService(userId);

      if (!user) {
        throw new NotFoundException(`User with id ${userId} does not exist.`);
      }

      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return { message: 'User Deleted Successfully.' };
    } catch (error) {
      console.log(
        '🚀 ~ file: user.service.ts:90 ~ UserService ~ deleteUserService ~ error:',
        error,
      );
      throw new BadRequestException(error.message);
    }
  }

  async updateUserService(userId: string, userDetails: UpdateUserDto) {
    try {
      const user = await this.getUserByIdService(userId);

      if (!user) {
        throw new NotFoundException(`User with id ${userId} does not exist.`);
      }

      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: userDetails,
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: user.service.ts:110 ~ UserService ~ updateUserService ~ error:',
        error,
      );
      throw new BadRequestException(error.message);
    }
  }

  async getUserByIdService(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${userId} does not exist.`);
      }

      return user;
    } catch (error) {
      console.log(
        '🚀 ~ file: user.service.ts:115 ~ UserService ~ getUserByIdService ~ error:',
        error,
      );
      throw new BadRequestException(error.message);
    }
  }
}
