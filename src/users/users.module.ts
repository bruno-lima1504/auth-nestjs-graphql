import { Module } from "@nestjs/common";
import { UsersResolver } from "./graphql/resolvers/users.resolver";
import { DatabaseModule } from "@/database/database.module";
import { PrismaService } from "@/database/prisma/prisma.service";
import { UsersPrismaRepository } from "./repositories/users-prisma.repository";

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
  ],
})
export class UsersModule {}