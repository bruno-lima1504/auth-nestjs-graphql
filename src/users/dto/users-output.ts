import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../graphql/models/users";

@ObjectType()
export class AuthorOutput {
  @Field(() => [User])
  users: User[];

  @Field()
  count: number;
}
