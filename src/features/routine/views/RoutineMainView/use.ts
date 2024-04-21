import { useMemo } from 'react';

import { RoutineMainViewProps } from '.';
import { useTask } from '../../contexts/taskContext';
import { ItemDataUtils } from '../../utils/ItemDataUtils';

export const useRoutineMainView = ({ referenceDate }: RoutineMainViewProps) => {
  const { taskListStatus, taskList } = useTask();

  const reminderList = useMemo(
    () =>
      taskList
        .filter(
          task =>
            task.kind === 'reminder' &&
            task.daysOfWeek.includes(referenceDate.getDay() + 1),
        )
        .map(task => ItemDataUtils.fromTaskToItemData(task)),
    [taskList, referenceDate],
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
