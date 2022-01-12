import { NotFoundError } from '../../../errors';
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { Score } from '../models';

const include = {
  data: {
    select: {
      courseNineId: true,
      data: true,
    },
  },
};

@Service()
class ScoreRepository {
  constructor(private dbContext: PrismaClient['wholeScore']) {}

  async create() {
    // todo
  }

  async findById(id: number): Promise<Score> {
    const score = await this.dbContext.findUnique({
      where: {
        id,
      },
      include,
    });
    if (!score) throw new NotFoundError(`Score Not Found. ID: ${id}`);

    return score;
  }

  find = async (): Promise<Score[]> => {
    const scores = await this.dbContext.findMany({
      include,
    });
    return scores;
  };
}

export default ScoreRepository;
