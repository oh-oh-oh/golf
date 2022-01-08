import { Role } from '@prisma/client';
import { ObjectType, registerEnumType } from 'type-graphql';

registerEnumType(Role, { name: 'Role' });
export { Role };

@ObjectType()
class User {
  id!: number;
  username!: string;
  shortName!: string;
  role!: Role;
}
