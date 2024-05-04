import { CreateTask } from '../../interfaces/CreateTask';
import { Task } from '../../interfaces/Task';
import { CreateReminderSchema } from '../../schemas/createReminderSchema';

export const initialValues: CreateReminderSchema = {
  name: '',
  daysOfWeek: [] as unknown as [number, ...number[]],
};

export const getInitialValues = (
  ediditingReminder: Task,
): CreateReminderSchema => ({
  name: ediditingReminder.name,
  daysOfWeek: ediditingReminder.daysOfWeek as unknown as [number, ...number[]],
});

export const transformData = (data: CreateReminderSchema): CreateTask => ({
  hours: 0,
  minutes: 0,
  kind: 'reminder',
  ...data,
});
