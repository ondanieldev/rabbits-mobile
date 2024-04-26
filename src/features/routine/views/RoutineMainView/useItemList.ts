import { useMemo } from 'react';

import { isSameDay } from 'date-fns';

import { AsyncStatus } from '../../../../shared/enums/AsyncStatus';
import { Appointment } from '../../interfaces/Appointment';
import { CompletedTask } from '../../interfaces/CompletedTask';
import { ItemData } from '../../interfaces/ItemData';
import { Task } from '../../interfaces/Task';
import { ItemDataUtils } from '../../utils/ItemDataUtils';
import { TaskUtils } from '../../utils/TaskUtils';

export type RoutineMainViewItemListHook = ({}: {
  appointmentList: Appointment[];
  appointmentListStatus: AsyncStatus;
  completedTaskList: CompletedTask[];
  completedTaskListStatus: AsyncStatus;
  referenceDate: Date;
  taskList: Task[];
  taskListStatus: AsyncStatus;
}) => {
  isLoadingItemList: boolean;
  itemList: ItemData[];
};

export const useRoutineMainViewItemList: RoutineMainViewItemListHook = ({
  appointmentList,
  appointmentListStatus,
  completedTaskList,
  completedTaskListStatus,
  referenceDate,
  taskList,
  taskListStatus,
}) => {
  const isLoadingItemList = useMemo(
    () =>
      taskListStatus === 'pending' ||
      appointmentListStatus === 'pending' ||
      completedTaskListStatus === 'pending',
    [taskListStatus, appointmentListStatus, completedTaskListStatus],
  );

  const habitItemDataList = useMemo(
    () =>
      taskList
        .filter(
          task =>
            TaskUtils.isHabit(task) &&
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

  const appointmentItemDataList = useMemo(
    () =>
      appointmentList
        .filter(appointment => isSameDay(appointment.date, referenceDate))
        .map(appointment =>
          ItemDataUtils.fromAppointmentToItemData(appointment),
        ),
    [appointmentList, referenceDate],
  );

  const itemList = useMemo(() => {
    const result = [...habitItemDataList, ...appointmentItemDataList];
    return result.sort(ItemDataUtils.sortComparer);
  }, [habitItemDataList, appointmentItemDataList]);

  return {
    isLoadingItemList,
    itemList,
  };
};
