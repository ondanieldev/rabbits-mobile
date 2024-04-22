import { CompletedTask } from './CompletedTask';

export type CreateCompletedTask = Pick<
  CompletedTask,
  'day' | 'month' | 'year' | 'taskId'
>;
