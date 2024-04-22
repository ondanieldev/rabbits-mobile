import { useCallback, useMemo } from 'react';

import { isSameDay } from 'date-fns';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useAppointment } from '../../contexts/appointmentContext';
import { useDay } from '../../contexts/dayContext';
import { useTask } from '../../contexts/taskContext';
import { ItemData } from '../../interfaces/ItemData';
import { updateAppointment } from '../../stores/appointmentStore';
import {
  createCompletedTask,
  deleteCompletedTask,
} from '../../stores/completedTaskStore';
import { ItemDataUtils } from '../../utils/ItemDataUtils';

export const useRoutineMainView = () => {
  const dispatch = useDispatch();

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
              completedTask =>
                completedTask.taskId === task.id &&
                isSameDay(
                  new Date(
                    completedTask.year,
                    completedTask.month - 1,
                    completedTask.day,
                  ),
                  referenceDate,
                ),
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
            completedTask =>
              completedTask.taskId === task.id &&
              isSameDay(
                new Date(
                  completedTask.year,
                  completedTask.month - 1,
                  completedTask.day,
                ),
                referenceDate,
              ),
          ),
        ),
      );

    const appointments = appointmentList
      .filter(appointment => isSameDay(appointment.date, referenceDate))
      .map(appointment => ItemDataUtils.fromAppointmentToItemData(appointment));

    const result = appointments.concat(habits);
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
      const aTime = a.date.getHours() * 60 + a.date.getMinutes();
      const bTime = b.date.getHours() * 60 + b.date.getMinutes();
      return aTime - bTime;
    });
  }, [taskList, referenceDate, completedTaskList, appointmentList]);

  const isLoadingItemList = useMemo(
    () =>
      taskListStatus === 'pending' ||
      appointmentListStatus === 'pending' ||
      completedTaskListStatus === 'pending',
    [taskListStatus, appointmentListStatus, completedTaskListStatus],
  );

  /**
   * Complete task
   */
  const onSelect = useCallback(
    async (data: ItemData) => {
      if (data.objectType === 'task') {
        if (data.isCompleted && data.completedRefId) {
          await dispatch(deleteCompletedTask(data.completedRefId)).unwrap();
        } else {
          const day = referenceDate.getDate();
          const month = referenceDate.getMonth() + 1;
          const year = referenceDate.getFullYear();
          await dispatch(
            createCompletedTask({
              day,
              month,
              year,
              taskId: data.id,
            }),
          ).unwrap();
        }
      } else if (data.objectType === 'appointment') {
        await dispatch(
          updateAppointment({
            date: data.date || referenceDate,
            id: data.id,
            isCompleted: !data.isCompleted,
            name: data.name,
          }),
        ).unwrap();
      }
    },
    [dispatch, referenceDate],
  );

  const totalCount = useMemo(
    () => itemList.length + reminderList.length,
    [itemList, reminderList],
  );

  const completedCount = useMemo(
    () =>
      itemList.filter(item => item.isCompleted).length +
      reminderList.filter(item => item.isCompleted).length,
    [itemList, reminderList],
  );

  return {
    reminderList,
    isLoadingReminderList,
    itemList,
    isLoadingItemList,
    referenceDate,
    setReferenceDate,
    onSelect,
    totalCount,
    completedCount,
  };
};
