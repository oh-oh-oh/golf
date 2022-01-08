import { ObjectType } from 'type-graphql';

@ObjectType()
class Course {
  id!: number;
  name!: string;
  data!: CourseNine[];
}

@ObjectType()
class CourseNine {
  id!: number;
  name!: string;
  par!: number[];
  hdc!: number[];
}
