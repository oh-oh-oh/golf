import { nineToArray } from '@/server/utils/nineToArray';
import {
  PrismaClient,
  Course as PrismaCourse,
  CourseNine,
  Par,
  Handicap,
} from '@prisma/client';
import { Service } from 'typedi';
import { NotFoundError } from '../../../errors';
import { Course } from '../models';

type RawCourse = PrismaCourse & {
  data: (CourseNine & {
    par: Par | null;
    hdc: Handicap | null;
  })[];
};

@Service()
class CourseRepository {
  constructor(private dbContext: PrismaClient['course']) {}

  async findById(id: number): Promise<Course> {
    const course = await this.dbContext.findUnique({
      where: {
        id,
      },
      include: {
        data: {
          include: {
            par: true,
            hdc: true,
          },
        },
      },
    });
    if (!course) throw new NotFoundError('Course not found.');
    return this.toDTO(course);
  }

  async find(): Promise<Course[]> {
    const courses = await this.dbContext.findMany({
      include: {
        data: {
          include: {
            par: true,
            hdc: true,
          },
        },
      },
    });
    return courses.map(this.toDTO);
  }

  async getByIds(ids: number[]): Promise<Course[]> {
    const courses = await this.dbContext.findMany({
      where: {
        id: {
          in: ids
        }
      },
      include: {
        data: {
          include: {
            par: true,
            hdc: true,
          },
        },
      },
    });
    return courses.map(this.toDTO);
  }

  private toDTO = ({ id, name, data }: RawCourse): Course => ({
    id,
    name,
    data: data.map(({ id, name, par, hdc }) => ({
      id,
      name,
      par: nineToArray(par),
      hdc: nineToArray(hdc),
    })),
  });
}

export default CourseRepository;
