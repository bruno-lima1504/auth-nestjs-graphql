import { Module } from "@nestjs/common";
import { UsersResolver } from "./graphql/resolvers/users.resolver";
import { DatabaseModule } from "@/database/database.module";
import { PrismaService } from "@/database/prisma/prisma.service";
import { UsersPrismaRepository } from "./repositories/users-prisma.repository";
import { AuthUserService } from "./services/auth-user.service";
import { CreateUserService } from "./services/create-user.service";

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersResolver,
    {
      provide: "PrismaService",
      useClass: PrismaService,
    },
    {
      provide: "UserRepository",
      useFactory: (prisma: PrismaService) => {
        return new UsersPrismaRepository(prisma);
      },
      inject: ["PrismaService"],
    },
    {
      provide: AuthUserService.Service,
      useFactory: (prisma: PrismaService) => {
        return new AuthUserService.Service(prisma);
      },
      inject: ["PrismaService"],
    },
    {
      provide: CreateUserService.Service,
      useFactory: (userRepository: UsersPrismaRepository) => {
        return new CreateUserService.Service(userRepository);
      },
      inject: ["UserRepository"],
    },
  ],
  exports: [AuthUserService.Service],
})
export class UsersModule {}
