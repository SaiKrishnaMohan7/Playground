import { TaskStatus } from '../task.model';

export class TaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
