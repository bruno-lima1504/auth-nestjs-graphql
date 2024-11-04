import { User } from "../graphql/models/users";
import { faker } from "@faker-js/faker";

export function UserDataBuilder(
  props: Partial<User>,
): Omit<User, "id" | "createdAt"> {
  return {
    name: props.name ?? faker.person.fullName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
  };
}
