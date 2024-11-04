import { User } from "../graphql/models/users";
import { ICreateUser } from "./create-user";

export interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
