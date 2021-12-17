import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { Service } from 'typedi';

@Service()
class UserRepository {
  constructor(private dbContext: PrismaClient['user']) {}

  async create(username: string, password: string) {
    const hashedPassword = await hash(password, 6);
    const createdUser = await this.dbContext.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return createdUser;
  }

  async findById(id: number) {
    return await this.dbContext.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
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
