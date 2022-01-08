import { NotFoundError } from '@/server/errors';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { User } from '../models';

@Service()
class UserRepository {
  constructor(private dbContext: PrismaClient['user']) {}

  async create(username: string, shortName: string, password: string) {
    const hashedPassword = await hash(password, 6);
    const createdUser = await this.dbContext.create({
      data: {
        username,
        shortName,
        password: hashedPassword,
      },
    });
    return createdUser;
  }

  async findById(id: number): Promise<User> {
    const user = await this.dbContext.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        shortName: true,
        role: true,
      },
    });
    if (!user) throw new NotFoundError('User not found.')
    return user;
  }

  async getByIds(ids: number[]): Promise<User[]> {
    const users = await this.dbContext.findMany({
      where: {
        id: {
          in: ids
        },
      },
      select: {
        id: true,
        username: true,
        shortName: true,
        role: true,
      },
    });
    return users;
  }

  async findByUsername(username: string) {
    return await this.dbContext.findUnique({
      where: {
        username,
      },
    });
  }
}

export default UserRepository;
