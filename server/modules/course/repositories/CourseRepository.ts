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

type RawNine = {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
  seven: number;
  eight: number;
  nine: number;
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
    if (!courses) return [];
    console.log('COURSES', courses);
    return courses.map(this.toDTO);
  }

  private toDTO = ({ id, name, data }: RawCourse): Course => ({
    id,
    name,
    data: data.map(({ id, name, par, hdc }) => ({
      id,
      name,
      par: this.combineNine(par),
      hdc: this.combineNine(hdc),
    })),
  });

  private combineNine = ({
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  }: any & RawNine): Array<number> => [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  ];
}

export default CourseRepository;
