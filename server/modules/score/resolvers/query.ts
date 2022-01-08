import { NotFoundError } from '../../../errors';
import { MyContext } from '../../../utils';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { Course } from '../../course/models';
import CourseService from '../../course/services/CourseService';
import { User } from '../../user/models';
import UserService from '../../user/services/UserService';
import { Score } from '../models';
import ScoreService from '../services/ScoreService';

@Resolver(of => Score)
class ScoreQueryResolver {
  @Inject() scoreService!: ScoreService;
  @Inject() courseService!: CourseService;
  @Inject() userService!: UserService;

  @Query(returns => Score)
  async score(@Arg('id') id: number) {
    return this.scoreService.findById(id);
  }

  @FieldResolver(returns => Course)
  async course(
    @Root() { courseId }: Score,
    @Ctx() { dataLoaders }: MyContext,
  ): Promise<Course> {
    const course = await dataLoaders.course.load(courseId);
    if (!course) throw new NotFoundError(`Course Not found id: ${courseId}`);
    return course;
  }

  @FieldResolver(returns => User)
  async user(
    @Root() { userId }: Score,
    @Ctx() { dataLoaders }: MyContext,
  ): Promise<User> {
    const user = await dataLoaders.user.load(userId);
    if (!user) throw new NotFoundError(`User Not found id: ${userId}`);
    return user;
  }
}

export default ScoreQueryResolver;
