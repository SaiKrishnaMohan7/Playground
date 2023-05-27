import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('task')
export class TaskController {
  // readonly taskService: TaskService;

  constructor(private taskService: TaskService) {
    // NOTE: in TS, we can declare taksService as private and can be used as this.taskService without needing to declare it as a property line 6
  }

  @Get()
  getAllTasks(): Array<Task> {
    return this.taskService.getAllTasks();
  }
}
