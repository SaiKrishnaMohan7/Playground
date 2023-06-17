import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student-input.dto';
import * as uuid from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const student = this.studentRepository.create({
      id: uuid.v4(),
      ...createStudentInput,
    });

    return await this.studentRepository.save(student);
  }

  async getStudents(): Promise<Array<Student>> {
    const students = await this.studentRepository.find();

    return students;
  }

  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });

    return student;
  }

  async getStudentsByIds(studentIds: Array<string>): Promise<Array<Student>> {
    return await this.studentRepository.find({
      where: { id: { $in: studentIds } } as any,
    });

    // Cleaner approach may be to use MongoRepository
    // return await this.studentRepository
    //       .createQueryBuilder('student')
    //       .where('student.id IN (:...studentIds)', { studentIds })
    //       .getMany();
  }
}
