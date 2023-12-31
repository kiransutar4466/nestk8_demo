"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const email_service_1 = require("../email/email.service");
const utils_1 = require("../utils/utils");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async registerUser(userDetails) {
        try {
            const getUser = await this.prisma.user.findUnique({
                where: { email: userDetails.email },
            });
            if (getUser) {
                throw new common_1.BadRequestException('Email already exists.');
            }
            const password = await (0, utils_1.generateRandomPassword)(10);
            console.log('🚀 ~ file: user.service.ts:27 ~ UserService ~ registerUser ~ password:', password);
            userDetails.password = await bcrypt.hash(password, 10);
            const UserObject = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, userDetails), { id: (0, uuid_1.v4)() }),
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
        }
        catch (error) {
            console.log('🚀 ~ file: user.service.ts:8 ~ UserService ~ registerUser ~ error:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async GetAllUserService() {
        try {
            return this.prisma.user.findMany();
        }
        catch (error) {
            console.log('🚀 ~ file: user.service.ts:66 ~ UserService ~ GetAllUserService ~ error:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteUserService(userId) {
        try {
            const user = await this.getUserByIdService(userId);
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${userId} does not exist.`);
            }
            await this.prisma.user.delete({
                where: {
                    id: userId,
                },
            });
            return { message: 'User Deleted Successfully.' };
        }
        catch (error) {
            console.log('🚀 ~ file: user.service.ts:90 ~ UserService ~ deleteUserService ~ error:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateUserService(userId, userDetails) {
        try {
            const user = await this.getUserByIdService(userId);
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${userId} does not exist.`);
            }
            return await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: userDetails,
            });
        }
        catch (error) {
            console.log('🚀 ~ file: user.service.ts:110 ~ UserService ~ updateUserService ~ error:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getUserByIdService(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${userId} does not exist.`);
            }
            return user;
        }
        catch (error) {
            console.log('🚀 ~ file: user.service.ts:115 ~ UserService ~ getUserByIdService ~ error:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map