import { Test, TestingModule } from "@nestjs/testing";
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { UserDataBuilder } from "../helpers/user-data-builder";
import { UsersPrismaRepository } from "../repositories/users-prisma.repository";
import { CreateUserService } from "./create-user.service";
import { ConflictError } from "@/shared/errors/conflict-error";
import { BadRequestError } from "@/shared/errors/bad-request-error";
import { compare } from "bcryptjs";

describe("UsersPrismaRepository Integration Test", () => {
  let module: TestingModule;
  let repository: UsersPrismaRepository;
  let service: CreateUserService.Service;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    execSync("npm run prisma:migrate");
    await prisma.$connect();
    module = await Test.createTestingModule({}).compile();
    repository = new UsersPrismaRepository(prisma as any);
    service = new CreateUserService.Service(repository);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await module.close();
  });

  test("should create a user", async () => {
    const data = UserDataBuilder({ password: "testeBruno" });

    const user = await service.execute(data);

    expect(user.id).toBeDefined();
    expect(user).toMatchObject(data);
  });

  test("should not be able to create with same email twice", async () => {
    const data = UserDataBuilder({ email: "repete@teste.com" });
    await service.execute(data);

    await expect(() => service.execute(data)).rejects.toBeInstanceOf(
      ConflictError,
    );
  });

  test("should throw error when name not provided", async () => {
    const data = UserDataBuilder({});
    data.name = null;

    await expect(() => service.execute(data)).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });

  test("should throw error when email not provided", async () => {
    const data = UserDataBuilder({});
    data.email = null;

    await expect(() => service.execute(data)).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });

  test("should throw error when password not provided", async () => {
    const data = UserDataBuilder({});
    data.password = null;

    await expect(() => service.execute(data)).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });
});
