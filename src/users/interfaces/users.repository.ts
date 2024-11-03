import { User } from "../graphql/models/users";
import { ICreateUser } from "./create-user";
import { IAuthUser } from "./auth-user";

export interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  AuthUser(data: IAuthUser): Promise<User>;
  findByEmail(email: string): Promise<User>;
  get(id: string): Promise<User>;
}
