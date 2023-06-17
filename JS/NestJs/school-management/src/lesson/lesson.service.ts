import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './dto/create-lesson-input.dto';
import * as uuid from 'uuid';
import { AssignStudentsToLessonInput } from './dto/assign-students-to-lesson-input.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    return lesson;
  }

  async getLessons(): Promise<Array<Lesson>> {
    const lessons = this.lessonRepository.find();

    return lessons;
  }

  async createLesson({
    name,
    startDate,
    endDate,
    students,
  }: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid.v4(),
      name,
      startDate,
      endDate,
      students,
    });

    return await this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson({
    lessonId,
    studentIds,
  }: AssignStudentsToLessonInput): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });

    lesson.students = [...lesson.students, ...studentIds]; // needs de-duping

    const lessonUpdatedWithStudentIds = this.lessonRepository.create({
      ...lesson,
    });

    return await this.lessonRepository.save(lessonUpdatedWithStudentIds);
  }
}
