import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { RouteMiddleWare } from 'src/utils/route.middleware';

@Module({
  providers: [UserService, PrismaService, EmailService],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RouteMiddleWare)
      .exclude({ path: 'user/register', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
