import { Test, TestingModule } from "@nestjs/testing";
import { UsersPrismaRepository } from "./users-prisma.repository";
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { UserDataBuilder } from "../helpers/user-data-builder";
import { UserNotFoundError } from "@/shared/errors/user-not-found-error";

describe("UsersPrismaRepository Integration Test", () => {
  let module: TestingModule;
  let repository: UsersPrismaRepository;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    execSync("npm run prisma:migrate");
    await prisma.$connect();
    module = await Test.createTestingModule({}).compile();
    repository = new UsersPrismaRepository(prisma as any);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await module.close();
  });

  test("should create a user", async () => {
    const data = UserDataBuilder({});
    const user = await repository.create(data);
    expect(user).toMatchObject(data);
  });

  test("should find a user by email", async () => {
    const data = UserDataBuilder({});
    const user = await prisma.user.create({ data });

    const result = await repository.findByEmail(user.email);
    expect(result).toStrictEqual(user);
  });

  test("should find a user by id", async () => {
    const data = UserDataBuilder({});
    const user = await prisma.user.create({ data });

    const result = await repository.findById(user.id);
    expect(result).toStrictEqual(user);
  });
});
