import { PrismaService } from "@/database/prisma/prisma.service";
import { User } from "../graphql/models/users";
import { ICreateUser } from "../interfaces/create-user";
import { IUsersRepository } from "../interfaces/users.repository";

export class UsersPrismaRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: ICreateUser): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
