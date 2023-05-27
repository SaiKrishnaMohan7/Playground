export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description?: string;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
