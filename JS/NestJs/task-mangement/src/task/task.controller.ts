import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
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

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Get()
  getTasksWithFilter(@Query() taskFilter: TaskFilterDto): Array<Task> {
    if (Object.keys(taskFilter).length) {
      return this.taskService.getTaskWithFilter(taskFilter);
    }

    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskPayload: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskPayload);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Array<Task> {
    return this.taskService.deleteTaskById(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
