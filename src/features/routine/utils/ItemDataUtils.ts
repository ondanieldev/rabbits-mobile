import { DateUtils } from '../../../shared/utils/DateUtils';
import { Appointment } from '../interfaces/Appointment';
import { CompletedTask } from '../interfaces/CompletedTask';
import { ItemData } from '../interfaces/ItemData';
import { Task } from '../interfaces/Task';

export class ItemDataUtils {
  static fromTaskToItemData = (
    task: Task,
    completedTask?: CompletedTask,
  ): ItemData => {
    let date: Date | null = null;
    if (completedTask) {
      date = DateUtils.buildDate({
        day: completedTask.day,
        month: completedTask.month,
        year: completedTask.year,
        hour: task.hours,
        minute: task.minutes,
        second: 0,
        millisecond: 0,
      });
    } else {
      date = DateUtils.buildDate({
        hour: task.hours,
        minute: task.minutes,
        second: 0,
        millisecond: 0,
      });
    }
    return {
      id: task.id,
      name: task.name,
      isCompleted: completedTask?.taskId === task.id,
      objectType: 'task',
      daysOfWeek: task.daysOfWeek,
      kind: task.kind,
      date,
      completedRefId: completedTask?.id,
    };
  };

  static fromAppointmentToItemData = (appointment: Appointment): ItemData => {
    const date = new Date(appointment.date);
    return {
      id: appointment.id,
      name: appointment.name,
      isCompleted: appointment.isCompleted,
      objectType: 'appointment',
      date,
      daysOfWeek: [date.getDay() + 1],
      completedRefId: appointment.id,
    };
  };

  static sortComparer = (a: ItemData, b: ItemData): number => {
    if (!a.date && !b.date) {
      return 0;
    }
    if (!a.date) {
      return -1;
    }
    if (!b.date) {
      return 1;
    }

    const aTime = a.date.getHours() * 60 + a.date.getMinutes();
    const bTime = b.date.getHours() * 60 + b.date.getMinutes();
    if (aTime !== bTime) {
      return aTime - bTime;
    }

    return a.name.localeCompare(b.name);
  };
}
