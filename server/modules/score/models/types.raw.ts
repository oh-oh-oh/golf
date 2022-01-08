import { ObjectType } from 'type-graphql';
import { Course } from '../../course/models';
import { User } from '../../user/models';

@ObjectType()
class Score {
  id!: number;
  userId!: number;
  user?: User;
  courseId!: number;
  course?: Course;
  data!: ScoreData[];
  date!: Date;
}

@ObjectType()
class ScoreData {
  courseNineId!: number;
  data!: number[];
}
