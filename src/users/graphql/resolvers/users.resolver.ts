import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "../models/users";
import { Inject } from "@nestjs/common";
import { CreateUserService } from "@/users/services/create-user.service";
import { CreateUsersInput } from "../inputs/crete-user.input";
import { AuthUsersInput } from "../inputs/auth-users.input";
import { AuthUserService } from "@/users/services/auth-user.service";
import { AuthResponse } from "../models/auth-response";
import { ListUsersService } from "@/users/services/list-users.service";
import { AuthorOutput } from "@/users/dto/users-output";
import { UserListResult } from "../models/list-users-reponse";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../guards/isAuthenticated.guard";

@Resolver(() => User)
export class UsersResolver {
  @Inject(CreateUserService.Service)
  private readonly CreateUserService: CreateUserService.Service;

  @Inject(AuthUserService.Service)
  private readonly AuthUserService: AuthUserService.Service;

  @Inject(ListUsersService.Service)
  private readonly ListUsersService: ListUsersService.Service;

  @Mutation(() => User)
  async createUser(@Args("data") data: CreateUsersInput) {
    return this.CreateUserService.execute(data);
  }

  @Query(() => AuthResponse)
  async AuthUser(@Args("data") data: AuthUsersInput): Promise<AuthResponse> {
    return this.AuthUserService.execute(data);
  }

  @Query(() => AuthorOutput)
  @UseGuards(JwtAuthGuard)
  async ListUser(): Promise<AuthorOutput> {
    return this.ListUsersService.execute();
  }
}
