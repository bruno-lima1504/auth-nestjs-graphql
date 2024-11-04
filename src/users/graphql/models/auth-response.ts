import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  token?: string;

  @Field()
  createdAt: Date;
}
