import { PrismaService } from "@/database/prisma/prisma.service";
import { Query, Resolver } from "@nestjs/graphql";
import { User } from "../models/users";

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [User])
  users() {
    return this.prisma.user.findMany();
  }
}
