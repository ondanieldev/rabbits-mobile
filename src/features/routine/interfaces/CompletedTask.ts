import { Task } from './Task';

export interface CompletedTask {
  id: string;
  day: number;
  month: number;
  year: number;
  taskId: string;
  task?: Task;
}
