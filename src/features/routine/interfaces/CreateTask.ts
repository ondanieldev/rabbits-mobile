import { Task } from './Task';

export type CreateTask = Pick<
  Task,
  'daysOfWeek' | 'hours' | 'kind' | 'minutes' | 'name'
>;
