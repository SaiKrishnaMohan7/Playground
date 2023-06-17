import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './dto/create-student-input.dto';
import { Student } from './student.entity';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('CreateStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query((returns) => [StudentType])
  async getStudents(): Promise<Array<Student>> {
    return this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  async getStudentById(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }
}
