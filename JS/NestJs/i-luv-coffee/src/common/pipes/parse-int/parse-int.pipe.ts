import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * Pipes have two typical use cases:

    Transformation: where we transform input data to the desired output
    Validation: where we evaluate input data and if valid, simply pass it through unchanged. If the data is NOT valid - we want to throw an exception.

In both cases, pipes operate on the arguments being processed by a controller’s route handler.

NestJS triggers a pipe just BEFORE a method is invoked.

Pipes also receive the arguments meant to be passed on to the method. Any transformation or validation operation takes place at this time
- afterwards the route handler is invoked with any (potentially) transformed arguments.
 */

// Custom Pipe
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not an integer.`,
      );
    }
    return value;
  }
}
