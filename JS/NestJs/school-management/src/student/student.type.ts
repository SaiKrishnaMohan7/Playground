import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LessonType } from '../lesson/lesson.type';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field((type) => [LessonType])
  lessons: Array<string>;
}
