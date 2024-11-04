import { BadRequestError } from "@/shared/errors/bad-request-error";
import { PrismaService } from "@/database/prisma/prisma.service";
import { compare } from "bcryptjs";
import { UserNotFoundError } from "@/shared/errors/user-not-found-error";
import { sign } from "jsonwebtoken";
import { AuthResponse } from "../graphql/models/auth-response";

export namespace AuthUserService {
  export type Input = {
    email: string;
    password: string;
  };

  export class Service {
    constructor(private prismaService: PrismaService) {}

    async execute(input: Input): Promise<AuthResponse> {
      const { email, password } = input;

      if (!email || !password) {
        throw new BadRequestError("Input data not provided");
      }

      const user = await this.prismaService.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new UserNotFoundError("Email or Password Invalid");
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new BadRequestError("Email or Password Invalid");
      }

      const token = sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: "3d",
        },
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        token: token,
      };
    }
  }
}
