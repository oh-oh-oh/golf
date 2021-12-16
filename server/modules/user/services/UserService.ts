import { User as PrismaUser } from '@prisma/client';
import { ValidationError } from '../../../errors';
import { Service } from 'typedi';
import { User } from '../models';
import { UserRepository } from '../repository';
import { compareSync } from 'bcrypt';

@Service()
class UserService {
  constructor(private userRepository: UserRepository) {}

  async find(): Promise<User> {
    return { id: 1, username: 'tim', role: 'ADMIN' };
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user)
      throw new ValidationError('', {
        field: 'username',
        message: 'Username not found.',
      });
    const valid = compareSync(password, user.password);
    if (!valid)
      throw new ValidationError('', {
        field: 'password',
        message: 'Incorrect Password.',
      });
    return this.toDTO(user);
  }

  private toDTO(user: PrismaUser): User {
    const { password: _, createdAt: __, updatedAt: ___, ...rest } = user;
    return rest;
  }
}

export default UserService;
