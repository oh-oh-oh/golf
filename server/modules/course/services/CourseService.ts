import { Service } from "typedi";
import { Course } from "../models";
import { CourseRepository } from "../repositories";

@Service()
class CourseService {
  constructor(private courseRepository: CourseRepository) {}

  async findById(id: number): Promise<Course> {
    const course = await this.courseRepository.findById(id);
    return course;
  }

  async find(): Promise<Course[]> {
    const courses = await this.courseRepository.find();
    return courses;
  }


  async getByIds(ids: number[]): Promise<Course[]> {
    const courses = await this.courseRepository.getByIds(ids);
    return courses;
  }
}

export default CourseService;
