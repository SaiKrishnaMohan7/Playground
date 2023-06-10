import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  // readonly taskService: TaskService;
  private logger = new Logger('TasksController');

  constructor(
    private taskService: TaskService,
    private configService: ConfigService,
  ) {
    // NOTE: in TS, we can declare taksService as private and can be used as this.taskService without needing to declare it as a property line 6
  }

  @Get()
  getTasksWithFilter(
    @Query() taskFilter: TaskFilterDto,
    @GetUser() user: User,
  ): Promise<Array<Task>> {
    this.configService.get('ENV');
    return this.taskService.getTaskWithFilter(taskFilter, user);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskPayload: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskPayload, user);
  }

  @Delete(':id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusPayload: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.taskService.updateTaskStatus(id, updateTaskStatusPayload, user);
  }
}
