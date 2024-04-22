import { Appointment } from '../interfaces/Appointment';
import { CompletedTask } from '../interfaces/CompletedTask';
import { ItemData } from '../interfaces/ItemData';
import { Task } from '../interfaces/Task';

export class ItemDataUtils {
  static fromTaskToItemData = (
    task: Task,
    completedTask?: CompletedTask,
  ): ItemData => {
    const date = new Date();
    date.setHours(task.hours);
    date.setMinutes(task.minutes);
    if (completedTask) {
      date.setDate(completedTask.day);
      date.setMonth(completedTask.month - 1);
      date.setFullYear(completedTask.year);
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
}
