import { UsersPrismaRepository } from "../repositories/users-prisma.repository";
import { User } from "../graphql/models/users";
import { verify } from "jsonwebtoken";

export namespace VerifyUserService {
  export type Input = {
    authToken: string;
  };

  interface Payload {
    sub: string;
  }

  export class Service {
    constructor(private usersRepository: UsersPrismaRepository) {}
    async execute(input: Input): Promise<User> {
      const { authToken } = input;

      const [, token] = authToken.split(" ");

      const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

      console.log(sub);

      const data = await this.usersRepository.findById(sub);
      return data;
    }
  }
}
