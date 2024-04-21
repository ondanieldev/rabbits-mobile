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
    };
  };
}
