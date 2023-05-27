import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';

type CreateTaskPayload = {
  title: string;
  description?: string;
};

@Injectable()
export class TaskService {
  private tasks: Array<Task> = [];

  // default public accessor
  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  createTask({ title, description }: CreateTaskPayload) {
    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }
}
