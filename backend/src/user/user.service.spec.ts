import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { generateRandomPassword } from '../utils/utils';
import { BadRequestException } from '@nestjs/common';
import { RegisterUserDto, UpdateUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, EmailService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Register User Service', () => {
    it('should throw Error if user already exists', async () => {
      const userDetails: RegisterUserDto = {
        firstName: 'string',
        lastName: 'string',
        email: 'existing@gmail.com', // Assume this email already exists
        phoneNumber: 'string',
        country: 'string',
        password: '',
      };

      const mockUser = {
        id: 'mockUserId',
        firstName: 'string',
        lastName: 'string',
        email: 'existing@gmail.com',
        phoneNumber: 'string',
        country: 'string',
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
      await expect(service.registerUser(userDetails)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should generate a random password and store it send the password to the user via email', async () => {
      const userDetails: RegisterUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123456789',
        country: 'USA',
        password: '',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prismaService.user, 'create').mockResolvedValue({
        id: 'mockUserId',
        ...userDetails,
        created_at: new Date(),
        updated_at: new Date(),
      });

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

      const sendEmailSpy = jest
        .spyOn(emailService, 'sendEmail')
        .mockResolvedValue(undefined);

      const password = generateRandomPassword(10);

      userDetails['password'] = password;
      const result = await service.registerUser(userDetails);
      console.log('Result:', result);

      expect(result).toBeTruthy();

      expect(sendEmailSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          body: {
            emailType: 'Login Password',
            toAddresses: userDetails.email,
            password: expect.stringMatching(/[A-Za-z0-9]{10}/), // Adjust the pattern as needed
            user: `${userDetails.firstName} ${userDetails.lastName}`,
            from: 'ramalondhe11@gmail.com',
          },
        }),
      );
    });
  });

  describe('Get All User Service', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          id: 'string',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'string',
          phoneNumber: 'string',
          country: 'string',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'string',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          password: 'string',
          phoneNumber: 'string',
          country: 'string',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockUsers);

      const result = await service.GetAllUserService();
      console.log('🚀 ~ file: user.service.spec.ts:137 ~ it ~ result:', result);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('deleteUserService', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 'string';
      jest.spyOn(service, 'getUserByIdService').mockResolvedValue(null);
      await expect(service.deleteUserService(userId)).rejects.toThrowError(
        BadRequestException,
      );
      expect(service.getUserByIdService).toHaveBeenCalledWith(userId);
    });
  });

  it('should delete a user and return success message', async () => {
    const userId = 'string';
    const mockUser = {
      id: 'mockUserId',
      firstName: 'string',
      lastName: 'string',
      email: 'existing@gmail.com',
      phoneNumber: 'string',
      country: 'string',
      password: 'hashedPassword',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.spyOn(service, 'getUserByIdService').mockResolvedValue(mockUser);
    jest.spyOn(prismaService.user, 'delete').mockResolvedValue(mockUser);

    const result = await service.deleteUserService(userId);
    console.log('🚀 ~ file: user.service.spec.ts:175 ~ it ~ result:', result);

    expect(service.getUserByIdService).toHaveBeenCalledWith(userId);
    expect(prismaService.user.delete).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(result).toEqual({ message: 'User Deleted Successfully.' });
  });

  describe('Update User Service', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 'nonExistentUserId';
      const updatedUserDetails: UpdateUserDto = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        email: 'updated.email@example.com',
        phoneNumber: 'string',
        country: 'string',
      };

      jest.spyOn(service, 'getUserByIdService').mockResolvedValue(null);

      await expect(
        service.updateUserService(userId, updatedUserDetails),
      ).rejects.toThrowError(BadRequestException);
    });
    it('should update user details successfully', async () => {
      const userId = 'mockUserId';
      const updatedUserDetails = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        email: 'updated.email@example.com',
        phoneNumber: 'string',
        country: 'string',
      };

      const mockUser = {
        id: userId,
        firstName: 'OriginalFirstName',
        lastName: 'OriginalLastName',
        email: 'original.email@example.com',
        phoneNumber: 'string',
        country: 'string',
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'getUserByIdService').mockResolvedValue(mockUser);
      jest.spyOn(prismaService.user, 'update').mockResolvedValue({
        ...mockUser,
        ...updatedUserDetails,
      });

      const result = await service.updateUserService(
        userId,
        updatedUserDetails,
      );
      console.log('🚀 ~ file: user.service.spec.ts:233 ~ it ~ result:', result);

      expect(service.getUserByIdService).toHaveBeenCalledWith(userId);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: updatedUserDetails,
      });
      expect(result).toEqual({
        ...mockUser,
        ...updatedUserDetails,
      });
    });
  });
  describe('Get User By Id Service', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 'nonExistentUserId';
      const updatedUserDetails: UpdateUserDto = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        email: 'updated.email@example.com',
        phoneNumber: 'string',
        country: 'string',
      };

      jest.spyOn(service, 'getUserByIdService').mockResolvedValue(null);

      await expect(
        service.updateUserService(userId, updatedUserDetails),
      ).rejects.toThrowError(BadRequestException);
    });

    it('should return user if found', async () => {
      const userId = 'existingUserId';
      const mockUser = {
        id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: 'string',
        country: 'string',
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.getUserByIdService(userId);
      console.log('🚀 ~ file: user.service.spec.ts:281 ~ it ~ result:', result);

      expect(result).toEqual(mockUser);
    });
  });
});
