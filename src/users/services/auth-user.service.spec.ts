import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/database/prisma/prisma.service";
import { UserDataBuilder } from "../helpers/user-data-builder";
import { AuthUserService } from "./auth-user.service";
import { UsersPrismaRepository } from "../repositories/users-prisma.repository";
import { CreateUserService } from "./create-user.service";
import { UsersModule } from "../users.module";
import { execSync } from "node:child_process";
import { BadRequestError } from "@/shared/errors/bad-request-error";
import { UserNotFoundError } from "@/shared/errors/user-not-found-error";

describe("UsersPrismaRepository Integration Test", () => {
  let module: TestingModule;
  let repository: UsersPrismaRepository;
  let service: AuthUserService.Service;
  let createService: CreateUserService.Service;
  let prisma: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [PrismaService],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
    execSync("npm run prisma:migrate");
    await prisma.$connect();
    repository = new UsersPrismaRepository(prisma);
    createService = new CreateUserService.Service(repository);
    service = new AuthUserService.Service(prisma);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await module.close();
  });

  test("should perform user authentication", async () => {
    const data = UserDataBuilder({});

    const user = await createService.execute(data);

    const login = await service.execute({
      email: data.email,
      password: data.password,
    });

    expect(login).toBeDefined();
    expect(typeof login.token).toBe("string");
  });

  test("should throw an error when the email is not provided", async () => {
    const data = UserDataBuilder({});

    await createService.execute(data);

    await expect(
      service.execute({
        email: null,
        password: data.password,
      }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });
  test("should throw an error when the password is not provided", async () => {
    const data = UserDataBuilder({});

    await createService.execute(data);

    await expect(
      service.execute({
        email: data.email,
        password: null,
      }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  test("should throw an error when the email or password is incorrect", async () => {
    const data = UserDataBuilder({});
    await expect(
      service.execute({
        email: data.email,
        password: data.password,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
