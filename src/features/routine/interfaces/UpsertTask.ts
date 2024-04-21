import { Task } from './Task';

export type UpsertTask = Pick<
  Task,
  'daysOfWeek' | 'hours' | 'kind' | 'minutes' | 'name'
>;
