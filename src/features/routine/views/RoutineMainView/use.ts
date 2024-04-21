import { useMemo } from 'react';

import { useTask } from '../../contexts/taskContext';
import { ItemDataUtils } from '../../utils/ItemDataUtils';

export const useRoutineMainView = () => {
  const { taskListStatus, taskList } = useTask();

  const reminderList = useMemo(
    () =>
      taskList
        .filter(task => task.kind === 'reminder')
        .map(task => ItemDataUtils.fromTaskToItemData(task)),
    [taskList],
  );

  const isLoadingReminderList = useMemo(
    () => taskListStatus === 'pending',
    [taskListStatus],
  );

  return {
    reminderList,
    isLoadingReminderList,
  };
};
