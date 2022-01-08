import { NotFoundError } from '../../../errors';
import { nineToArray } from '../../../utils';
import {
  PrismaClient,
  Score as PrismaScore,
  WholeScore,
} from '@prisma/client';
import { Service } from 'typedi';
import { Score } from '../models';

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
      include: {
        data: true,
      },
    });
    if (!score) throw new NotFoundError(`Score Not Found. ID: ${id}`);

    return this.toDTO(score);
  }

  find = async (): Promise<Score[]> => {
    const scores = await this.dbContext.findMany({
      include: {
        data: true,
      }
    });
    return scores.map(this.toDTO);
  };

  private toDTO = (
    { id, courseId, data, date, userId }:
      WholeScore & {
        data: PrismaScore[];
      },
  ): Score => {
    return {
      id,
      userId,
      courseId,
      date,
      data: data.map((r: any) => ({
        courseNineId: r.id,
        data: nineToArray(r),
      })),
    };
  };
}

export default ScoreRepository;
