import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { NotFoundError } from '../../../errors';
import { Course } from '../models';

const include = {
  data: {
    select: {
      id: true,
      name: true,
      par: true,
      hdc: true,
    },
  },
};

@Service()
class CourseRepository {
  constructor(private dbContext: PrismaClient['course']) {}

  async findById(id: number): Promise<Course> {
    const course = await this.dbContext.findUnique({
      where: {
        id,
      },
      include,
    });
    if (!course) throw new NotFoundError('Course not found.');
    return course;
  }

  async find(): Promise<Course[]> {
    const courses = await this.dbContext.findMany({
      include,
    });
    return courses;
  }

  async getByIds(ids: number[]): Promise<Course[]> {
    const courses = await this.dbContext.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include,
    });
    return courses;
  }
}

export default CourseRepository;
