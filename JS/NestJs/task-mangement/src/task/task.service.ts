import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // default accessor is public
  async getAllTasks(): Promise<Array<Task>> {
    const tasks = await this.tasksRepository.find();

    return tasks;
  }

  async getTaskWithFilter({
    search,
    status,
  }: TaskFilterDto): Promise<Array<Task>> {
    const tasks = await this.tasksRepository.findBy({
      title: search,
      description: search,
      status,
    });

    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
    });
    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTaskById(id: string): Promise<boolean> {
    const deleteResult = await this.tasksRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return true;
  }

  async updateTaskStatus(
    id: string,
    { status }: UpdateTaskStatusDto,
  ): Promise<boolean> {
    const updateResult = await this.tasksRepository.update(id, {
      status: status,
    });

    if (!updateResult.affected) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return true;
  }
}
