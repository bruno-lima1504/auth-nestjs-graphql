import { PrismaService } from "@/database/prisma/prisma.service";
import { User } from "../graphql/models/users";
import { ICreateUser } from "../interfaces/create-user";
import { IUsersRepository } from "../interfaces/users.repository";
import { UserNotFoundError } from "@/shared/errors/user-not-found-error";

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

  async findAllWithCount(): Promise<{ users: User[]; count: number }> {
    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany(),
      this.prisma.user.count(),
    ]);
    return { users, count };
  }

  async findById(id: string): Promise<User> {
    return await this.get(id);
  }

  async get(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UserNotFoundError(`User not found using ID ${id}`);
    }
    return user;
  }
}
