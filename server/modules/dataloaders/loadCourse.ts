import { batchFetchEntitiesById } from '@/server/utils/batchFetchEntitiesById';
import { Course } from '../course/models';
import DataLoader from 'dataloader';
import CourseService from '../course/services/CourseService';

export const makeCourseLoader = (courseService: CourseService) =>
  new DataLoader<number, Course | null>(courseIds => {
    const boundGetById = courseService.getByIds.bind(courseService);
    return batchFetchEntitiesById(boundGetById, courseIds, 'id');
  });
