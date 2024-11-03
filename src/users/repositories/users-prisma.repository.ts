import { PrismaService } from "@/database/prisma/prisma.service";
import { User } from "../graphql/models/users";
import { IAuthUser } from "../interfaces/auth-user";
import { ICreateUser } from "../interfaces/create-user";
import { IUsersRepository } from "../interfaces/users.repository";

export class UsersPrismaRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  create(data: ICreateUser): Promise<User> {
    throw new Error("Method not implemented.");
  }

  AuthUser(data: IAuthUser): Promise<User> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  get(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
