import { UsersPrismaRepository } from "../repositories/users-prisma.repository";
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

  export type ListOutput = {
    users: User[];
    count: number;
  };

  export class Service {
    constructor(private usersRepository: UsersPrismaRepository) {}
    async execute(): Promise<ListOutput> {
      const data = await this.usersRepository.findAllWithCount();
      return data;
    }
  }
}
