import { isSameDay } from 'date-fns';

import { DateUtils } from '../../../shared/utils/DateUtils';
import { CompletedTask } from '../interfaces/CompletedTask';
import { Task } from '../interfaces/Task';

export class TaskUtils {
  static isHabit(task: Task) {
    return task.kind === 'habit';
  }

  static isReminder(task: Task) {
    return task.kind === 'reminder';
  }

  static includesDayOfWeek(task: Task, referenceDate: Date) {
    return task.daysOfWeek.includes(referenceDate.getDay() + 1);
  }

  static isCompleted = (
    task: Task,
    { year, month, day, taskId }: CompletedTask,
    referenceDate: Date,
  ) =>
    taskId === task.id &&
    isSameDay(
      DateUtils.buildDate({
        year,
        month,
        day,
      }),
      referenceDate,
    );

  static sortComparer = (a: Task, b: Task) => {
    if (a.hours !== b.hours) {
      return a.hours - b.hours;
    }
    if (a.minutes !== b.minutes) {
      return b.minutes - b.minutes;
    }
    return a.name.localeCompare(b.name);
  };
}
