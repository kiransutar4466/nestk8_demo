import { UserService } from './user.service';
import { RegisterUserDto, UpdateUserDto, UserOutputDto } from './dto/register-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(userDetails: RegisterUserDto): Promise<{
        message: string;
    }>;
    getAllUser(): Promise<UserOutputDto[]>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
    updateUser(userId: string, userDetails: UpdateUserDto): Promise<{
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
    getUserById(userId: string): Promise<{
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
