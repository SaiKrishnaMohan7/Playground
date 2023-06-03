import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  // readonly taskService: TaskService;

  constructor(private taskService: TaskService) {
    // NOTE: in TS, we can declare taksService as private and can be used as this.taskService without needing to declare it as a property line 6
  }

  @Get()
  getTasksWithFilter(@Query() taskFilter: TaskFilterDto): Promise<Array<Task>> {
    return this.taskService.getTaskWithFilter(taskFilter);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskPayload: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskPayload);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Promise<boolean> {
    return this.taskService.deleteTaskById(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusPayload: UpdateTaskStatusDto,
  ): Promise<boolean> {
    return this.taskService.updateTaskStatus(id, updateTaskStatusPayload);
  }
}
