import { useMemo } from 'react';

import { AsyncStatus } from '../../../../shared/enums/AsyncStatus';
import { CompletedTask } from '../../interfaces/CompletedTask';
import { ItemData } from '../../interfaces/ItemData';
import { Task } from '../../interfaces/Task';
import { ItemDataUtils } from '../../utils/ItemDataUtils';
import { TaskUtils } from '../../utils/TaskUtils';

export type RoutineMainViewReminderListHook = ({}: {
  completedTaskListStatus: AsyncStatus;
  completedTaskList: CompletedTask[];
  referenceDate: Date;
  taskList: Task[];
  taskListStatus: AsyncStatus;
}) => {
  isLoadingReminderList: boolean;
  reminderList: ItemData[];
};

export const useRoutineMainViewReminderList: RoutineMainViewReminderListHook =
  ({
    completedTaskListStatus,
    completedTaskList,
    referenceDate,
    taskList,
    taskListStatus,
  }) => {
    const isLoadingReminderList = useMemo(
      () =>
        taskListStatus === 'pending' || completedTaskListStatus === 'pending',
      [taskListStatus, completedTaskListStatus],
    );

    const reminderList = useMemo(
      () =>
        taskList
          .filter(
            task =>
              TaskUtils.isReminder(task) &&
              TaskUtils.includesDayOfWeek(task, referenceDate),
          )
          .map(task =>
            ItemDataUtils.fromTaskToItemData(
              task,
              completedTaskList.find(completedTask =>
                TaskUtils.isCompleted(task, completedTask, referenceDate),
              ),
            ),
          ),
      [taskList, referenceDate, completedTaskList],
    );

    return {
      isLoadingReminderList,
      reminderList,
    };
  };
