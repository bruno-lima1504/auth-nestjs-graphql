import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./users";

@ObjectType()
export class UserListResult {
  @Field(() => [User])
  users: User;

  @Field(() => Int)
  count: number;
}
