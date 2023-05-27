import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

// DTO just for one porperty vs defining an entire custom pipe; former better, least resistence, mainatainable
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
