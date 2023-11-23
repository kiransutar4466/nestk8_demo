import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RouteMiddleWare implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = (req.headers as any).authorization;

    if (!authorizationHeader) {
      throw new BadRequestException('Authorization header is missing');
    }

    const token = authorizationHeader.split(' ')[1];

    const user: any = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          throw new UnauthorizedException('Unauthorized');
        }
        return user;
      },
    );
    const userId = user.id;

    const userData = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userData) {
      throw new UnauthorizedException('Unauthorized');
    }
    next();
  }
}
