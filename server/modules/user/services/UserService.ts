import { User as PrismaUser } from '@prisma/client';
import { ApiError, ValidationError } from '../../../errors';
import { Service } from 'typedi';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { compareSync } from 'bcrypt';

@Service()
class UserService {
  constructor(private userRepository: UserRepository) {}

  async findById(id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async find(): Promise<User> {
    return { id: 1, username: 'tim', shortName: 'tim', role: 'ADMIN' };
  }

  async getByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.getByIds(ids);
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

  async register(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (user)
      throw new ValidationError('', {
        field: 'username',
        message: 'Username taken.',
      });
    const savedUser = await this.userRepository.create(username, password);
    if (!savedUser) throw new ApiError('User not created.');
    return this.toDTO(savedUser);
  }

  private toDTO(user: PrismaUser): User {
    const { password: _, createdAt: __, updatedAt: ___, ...rest } = user;
    return rest;
  }
}

export default UserService;
