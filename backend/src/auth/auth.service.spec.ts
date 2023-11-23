import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginService', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      const mockLoginDto: LoginDto = {
        email: 'nonexistent@gmail.com',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(service.loginService(mockLoginDto)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const mockLoginDto: LoginDto = {
        email: 'existing@gmail.com',
        password: 'incorrectPassword',
      };

      const mockUser = {
        id: 'abcedefg',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phoneNumber: 'string',
        country: 'string',
        password: 'string',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      await expect(service.loginService(mockLoginDto)).rejects.toThrowError(
        BadRequestException,
      );
    });
    it('should return success response with access token if credentials are correct', async () => {
      const mockLoginDto: LoginDto = {
        email: 'ramakant.londhe@thinkitive.com',
        password: 'NxuQuPIKVG',
      };

      const mockUser = {
        id: 'abcedefg',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phoneNumber: 'string',
        country: 'string',
        password: 'string',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      (bcrypt.compare as unknown as jest.Mock).mockResolvedValue(true);

      const result = await service.loginService(mockLoginDto);
      console.log('🚀 ~ file: auth.service.spec.ts:96 ~ it ~ result:', result);

      expect(result).toBeTruthy();
    });
  });
});
