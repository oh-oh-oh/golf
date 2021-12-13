import { ObjectType } from "type-graphql";

@ObjectType()
class User {
  id!: number;
  username!: string;
  password!: string;
}
