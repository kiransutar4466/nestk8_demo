import { HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    loginService(loginDetails: LoginDto): Promise<{
        success: boolean;
        accessToken: any;
        statusCode: HttpStatus;
    }>;
}
