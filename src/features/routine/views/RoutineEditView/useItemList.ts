import { useMemo } from 'react';

import { useSelector } from '../../../../shared/hooks/useSelector';
import { SearchUtils } from '../../../../shared/utils/SearchUtils';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { Appointment } from '../../interfaces/Appointment';
import { ItemData } from '../../interfaces/ItemData';
import { Task } from '../../interfaces/Task';
import { ItemDataUtils } from '../../utils/ItemDataUtils';
import { TaskUtils } from '../../utils/TaskUtils';

export type RoutineEditViewItemListHook = ({}: {
  appointmentList: Appointment[];
  search: string;
  selectedCreatableType: ItemCreatableType;
  taskList: Task[];
}) => {
  itemDataList: ItemData[];
  isLoading: boolean;
};

export const useRoutineEditViewItemList: RoutineEditViewItemListHook = ({
  appointmentList,
  search,
  selectedCreatableType,
  taskList,
}) => {
  /**
   * Loading parts
   */
  const taskListStatus = useSelector(state => state.task.taskListStatus);

  const appointmentListStatus = useSelector(
    state => state.appointment.appointmentListStatus,
  );

  /**
   * Loading result
   */
  const isLoading = useMemo(
    () => taskListStatus === 'pending' || appointmentListStatus === 'pending',
    [taskListStatus, appointmentListStatus],
  );

  /**
   * List parts
   */
  const habitItemDataList = useMemo(
    () =>
      taskList
        .filter(
          task =>
            TaskUtils.isHabit(task) &&
            SearchUtils.insensitive(search, task.name),
        )
        .map(task => ItemDataUtils.fromTaskToItemData(task)),
    [taskList, search],
  );

  const reminderItemDataList = useMemo(
    () =>
      taskList
        .filter(
          appointment =>
            TaskUtils.isReminder(appointment) &&
            SearchUtils.insensitive(search, appointment.name),
        )
        .map(appointment => ItemDataUtils.fromTaskToItemData(appointment)),
    [taskList, search],
  );

  const appointmentItemDataList = useMemo(
    () =>
      appointmentList
        .filter(x => SearchUtils.insensitive(search, x.name))
        .map(ItemDataUtils.fromAppointmentToItemData),
    [appointmentList, search],
  );

  /**
   * List result
   */
  const itemDataList = useMemo<ItemData[]>(() => {
    if (selectedCreatableType === 'habit') {
      return habitItemDataList;
    }
    if (selectedCreatableType === 'reminder') {
      return reminderItemDataList;
    }
    if (selectedCreatableType === 'event') {
      return appointmentItemDataList;
    }
    return [];
  }, [
    selectedCreatableType,
    habitItemDataList,
    reminderItemDataList,
    appointmentItemDataList,
  ]);

  /**
   * Return
   */
  return {
    itemDataList,
    isLoading,
  };
};
