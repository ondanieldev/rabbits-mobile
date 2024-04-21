import { CreateTask } from './CreateTask';

export type UpdateTask = CreateTask & {
  id: string;
};
