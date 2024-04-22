import { useMemo } from 'react';

import { isSameDay } from 'date-fns';

import { useAppointment } from '../../contexts/appointmentContext';
import { useDay } from '../../contexts/dayContext';
import { useTask } from '../../contexts/taskContext';
import { ItemDataUtils } from '../../utils/ItemDataUtils';

export const useRoutineMainView = () => {
  /**
   * Load task list
   */
  const { taskListStatus, taskList } = useTask();

  /**
   * Load appointment list
   */
  const { appointmentList, appointmentListStatus } = useAppointment();

  /**
   * Load completed task list
   */
  const {
    completedTaskList,
    completedTaskListStatus,
    referenceDate,
    setReferenceDate,
  } = useDay();

  /**
   * Setup reminder list
   */
  const reminderList = useMemo(
    () =>
      taskList
        .filter(
          task =>
            task.kind === 'reminder' &&
            task.daysOfWeek.includes(referenceDate.getDay() + 1),
        )
        .map(task =>
          ItemDataUtils.fromTaskToItemData(
            task,
            completedTaskList.find(
              completedTask => completedTask.taskId === task.id,
            ),
          ),
        ),
    [taskList, referenceDate, completedTaskList],
  );

  const isLoadingReminderList = useMemo(
    () => taskListStatus === 'pending' || completedTaskListStatus === 'pending',
    [taskListStatus, completedTaskListStatus],
  );

  /**
   * Setup item list
   */
  const itemList = useMemo(() => {
    const habits = taskList
      .filter(
        task =>
          task.kind === 'habit' &&
          task.daysOfWeek.includes(referenceDate.getDay() + 1),
      )
      .map(task =>
        ItemDataUtils.fromTaskToItemData(
          task,
          completedTaskList.find(
            completedTask => completedTask.taskId === task.id,
          ),
        ),
      );

    const appointments = appointmentList
      .filter(appointment => isSameDay(appointment.date, referenceDate))
      .map(appointment => ItemDataUtils.fromAppointmentToItemData(appointment));

    const result = habits.concat(appointments);
    return result.sort((a, b) => {
      if (!a.date && !b.date) {
        return 0;
      }
      if (!a.date) {
        return -1;
      }
      if (!b.date) {
        return 1;
      }
      return a.date.getTime() - b.date.getTime();
    });
  }, [taskList, referenceDate, completedTaskList, appointmentList]);

  const isLoadingItemList = useMemo(
    () =>
      taskListStatus === 'pending' ||
      appointmentListStatus === 'pending' ||
      completedTaskListStatus === 'pending',
    [taskListStatus, appointmentListStatus, completedTaskListStatus],
  );

  return {
    reminderList,
    isLoadingReminderList,
    itemList,
    isLoadingItemList,
    referenceDate,
    setReferenceDate,
  };
};
