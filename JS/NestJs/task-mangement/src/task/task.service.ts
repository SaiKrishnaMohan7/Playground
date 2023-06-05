import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
// import { TasksRepository } from './task.repository';

@Injectable()
export class TaskService {
  // constructor(private taskRepository: TaskRepository) {}
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // default accessor is public
  // async getAllTasks(): Promise<Array<Task>> {
  //   const tasks = await this.tasksRepository.find();

  //   return tasks;
  // }

  async getTaskWithFilter(
    { search, status }: TaskFilterDto,
    user: User,
  ): Promise<Array<Task>> {
    const tasks = await this.tasksRepository.findBy({
      title: search,
      description: search,
      status,
      user,
    });

    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
      user,
    });
    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<boolean> {
    const deleteResult = await this.tasksRepository.delete({ id, user });

    if (!deleteResult.affected) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return true;
  }

  async updateTaskStatus(
    id: string,
    { status }: UpdateTaskStatusDto,
    user: User,
  ): Promise<boolean> {
    const updateResult = await this.tasksRepository.update(
      { id, user },
      {
        status,
      },
    );

    if (!updateResult.affected) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return true;
  }
}
