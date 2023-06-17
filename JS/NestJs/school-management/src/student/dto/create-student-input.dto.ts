import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @MinLength(1)
  @Field()
  firstname: string;

  @MinLength(1)
  @Field()
  lastname: string;
}
