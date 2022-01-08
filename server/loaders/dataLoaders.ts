import { makeCourseLoader } from '../modules/dataloaders/loadCourse';
import { makeUserLoader } from '../modules/dataloaders/loadUser';
import { Services } from './service';

const loadDataLoaders = (services: Services) => {
  const courseDataLoader = makeCourseLoader(services.CourseService);
  const userDataLoader = makeUserLoader(services.UserService);

  return {
    course: courseDataLoader,
    user: userDataLoader,
  };
};

export type DataLoader = ReturnType<typeof loadDataLoaders>;

export default loadDataLoaders;
