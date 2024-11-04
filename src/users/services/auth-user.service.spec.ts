import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/database/prisma/prisma.service";
import { UserDataBuilder } from "../helpers/user-data-builder";
import { AuthUserService } from "./auth-user.service";
import { UsersPrismaRepository } from "../repositories/users-prisma.repository";
import { CreateUserService } from "./create-user.service";
import { verify } from "jsonwebtoken";
import { UsersModule } from "../users.module";

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

  test("should create a user", async () => {
    const data = UserDataBuilder({});
    console.log("Password (plain text) used to create user:", data.password);

    const user = await createService.execute(data);
    console.log("User created:", user);

    const login = await service.execute({
      email: data.email,
      password: data.password,
    });

    console.log("Login result:", login);

    expect(user).toMatchObject({ ...data, password: expect.any(String) });
    expect(login.token).toBeDefined();

    const decoded = verify(login.token!, process.env.JWT_SECRET!) as any;

    expect(decoded).toMatchObject({
      name: login.name,
      email: login.email,
      sub: login.id,
    });
  });
});
