import { RegisterUserDto, UpdateUserDto, UserOutputDto } from './dto/register-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
export declare class UserService {
    private readonly prisma;
    private readonly emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    registerUser(userDetails: RegisterUserDto): Promise<{
        message: string;
    }>;
    GetAllUserService(): Promise<UserOutputDto[]>;
    deleteUserService(userId: string): Promise<{
        message: string;
    }>;
    updateUserService(userId: string, userDetails: UpdateUserDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        country: string;
        created_at: Date;
        updated_at: Date;
    }>;
    getUserByIdService(userId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        country: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
