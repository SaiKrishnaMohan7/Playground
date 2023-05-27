import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task as TaskEntity } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  private tasks: Array<Task> = [];

  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  // default public accessor
  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  getTaskWithFilter({ search, status }: TaskFilterDto): Array<Task> {
    let tasks = this.getAllTasks();

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) || // this lowercasing can be handled at the pipe level
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
    }
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTask({ title, description }: CreateTaskDto) {
    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    this.tasks = this.tasks.filter((task) => task.id !== id); // can use slice

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  updateTaskStatus(id: string, { status }: UpdateTaskStatusDto): Task {
    // Could have used this.getTaskById(id)
    let updatedTask: Task = { id: '', status: TaskStatus.OPEN, title: '' };
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        task.status = status;
        updatedTask = task;
      }

      return task;
    });

    return updatedTask;
  }
}
