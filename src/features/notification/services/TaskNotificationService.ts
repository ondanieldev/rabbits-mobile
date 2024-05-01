import { isPast } from 'date-fns';

import { User } from '../../../shared/interfaces/User';
import { DateUtils } from '../../../shared/utils/DateUtils';
import { CompletedTask } from '../../routine/interfaces/CompletedTask';
import { Task } from '../../routine/interfaces/Task';
import { TaskUtils } from '../../routine/utils/TaskUtils';
import { NotificationService } from './NotificationService';

export class TaskNotificationService {
  static getDate(task: Task) {
    return DateUtils.buildDate({
      hour: task.hours,
      minute: task.minutes,
      second: 0,
      millisecond: 0,
    });
  }

  static getId(task: Task) {
    return `task:${task.id}:${TaskNotificationService.getDate(task).getTime()}`;
  }

  static isId(id: string) {
    return id.startsWith('task:');
  }

  static async readIdList() {
    const notificationIdList = await NotificationService.readTriggerIdList();

    return notificationIdList.filter(id => TaskNotificationService.isId(id));
  }

  static async upsert(
    user: User,
    task: Task,
    completedTask?: CompletedTask,
  ): Promise<string | null> {
    const date = TaskNotificationService.getDate(task);
    const id = TaskNotificationService.getId(task);

    if (
      !completedTask &&
      !isPast(date) &&
      task.kind === 'habit' &&
      user.isNotificationEnabled &&
      task.isNotificationEnabled &&
      TaskUtils.includesDayOfWeek(task, date)
    ) {
      await NotificationService.upsertTrigger({
        id,
        timestamp: date.getTime(),
        title: task.name,
        sound: user.isSoundEnabled && task.isSoundEnabled,
        vibration: user.isVibrationEnabled && task.isVibrationEnabled,
      });
      return id;
    }

    return null;
  }

  static async upsertList(
    user: User,
    taskList: Task[],
    completedTaskList: CompletedTask[],
  ) {
    if (!user.isNotificationEnabled) {
      return [];
    }

    const upsertedIdList = [];

    for (const task of taskList) {
      const completedTask = completedTaskList.find(x => x.taskId === task.id);

      const id = await TaskNotificationService.upsert(
        user,
        task,
        completedTask,
      );

      if (id) {
        upsertedIdList.push(id);
      }
    }

    return upsertedIdList;
  }

  static async deleteDanglingList(newIdList: string[]) {
    const deletedIdList = [];
    const currentIdList = await TaskNotificationService.readIdList();

    for (const id of currentIdList) {
      if (!newIdList.includes(id)) {
        await NotificationService.delete(id);
        deletedIdList.push(id);
      }
    }

    return deletedIdList;
  }
}
