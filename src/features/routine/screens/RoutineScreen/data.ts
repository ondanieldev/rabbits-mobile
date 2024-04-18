import { Appointment } from '../../interfaces/Appointment';
import { CompletedTask } from '../../interfaces/CompletedTask';
import { Task } from '../../interfaces/Task';

export const taskList: Task[] = [
  {
    id: '1',
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    name: 'Do the dishes',
    hours: 13,
    kind: 'reminder',
    minutes: 10,
    userId: '1',
  },
  {
    id: '2',
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    name: 'Take out the trash',
    hours: 14,
    kind: 'reminder',
    minutes: 20,
    userId: '1',
  },
  {
    id: '3',
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    name: 'Feed the cat',
    hours: 15,
    kind: 'reminder',
    minutes: 30,
    userId: '1',
  },
  {
    id: '4',
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    name: 'Walk the dog',
    hours: 16,
    kind: 'habit',
    minutes: 40,
    userId: '1',
  },
  {
    id: '5',
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    name: 'Go to the gym',
    hours: 17,
    kind: 'habit',
    minutes: 50,
    userId: '1',
  },
];

export const completedTaskList: CompletedTask[] = [
  {
    id: '11',
    day: 16,
    month: 4,
    year: 2024,
    taskId: '4',
  },
  {
    id: '22',
    day: 16,
    month: 4,
    year: 2024,
    taskId: '3',
  },
];

export const appointmentList: Appointment[] = [
  {
    date: new Date(2024, 4, 16, 18, 0),
    id: '111',
    isCompleted: false,
    name: 'Dentist appointment',
    userId: '1',
  },
  {
    date: new Date(2024, 4, 16, 19, 0),
    id: '222',
    isCompleted: false,
    name: 'Meeting with John',
    userId: '1',
  },
];
