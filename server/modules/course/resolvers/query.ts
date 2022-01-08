import { Arg, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { Course } from '../models';
import CourseService from '../services/CourseService';

@Resolver(of => Course)
class CourseQueryResolver {
  @Inject() courseService!: CourseService;

  @Query(returns => Course, { nullable: true })
  async course(@Arg('courseId') courseId: number): Promise<Course> {
    const course = await this.courseService.findById(courseId);
    return course;
  }
  
  @Query(returns => [Course])
  async courses(): Promise<Course[]> {
    const courses = await this.courseService.find();
    return courses;
  }
}

export default CourseQueryResolver;
