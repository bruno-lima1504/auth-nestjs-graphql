import { BadRequestError } from "@/shared/errors/bad-request-error";
import { ConflictError } from "@/shared/errors/conflict-error";
import { UsersPrismaRepository } from "../repositories/users-prisma.repository";
import * as bcrypt from "bcryptjs";
import { User } from "../graphql/models/users";

export namespace ListUsersService {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
  };

  export type Teste = {
    users: User[];
    count: number;
  };

  export class Service {
    constructor(private usersRepository: UsersPrismaRepository) {}
    async execute(): Promise<Teste> {
      const data = await this.usersRepository.findAllWithCount();
      return data;
    }
  }
}
