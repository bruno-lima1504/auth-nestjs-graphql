import { BadRequestError } from "@/shared/errors/bad-request-error";
import { ConflictError } from "@/shared/errors/conflict-error";
import { UsersPrismaRepository } from "../repositories/users-prisma.repository";
import * as bcrypt from "bcryptjs";

export namespace CreateUserService {
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

  export class Service {
    constructor(private usersRepository: UsersPrismaRepository) {}
    async execute(input: Input): Promise<Output> {
      let { name, email, password } = input;

      if (!email || !name || !password) {
        throw new BadRequestError("Input data not provided");
      }

      const emailExists = await this.usersRepository.findByEmail(email);

      if (emailExists) {
        throw new ConflictError("Email address used by other user");
      }

      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);

      const user = await this.usersRepository.create({
        ...input,
        password: hashPassword,
      });

      return user;
    }
  }
}
