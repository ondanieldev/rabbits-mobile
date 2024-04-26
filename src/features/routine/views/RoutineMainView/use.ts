import { useAppointment } from '../../contexts/appointmentContext';
import { useDay } from '../../contexts/dayContext';
import { useTask } from '../../contexts/taskContext';
import { useRoutineMainViewItemList } from './useItemList';
import { useRoutineMainViewProgressBar } from './useProgressBar';
import { useRoutineMainViewReminderList } from './useReminderList';
import { useRoutineMainViewToggleItem } from './useToggleItem';

export const useRoutineMainView = () => {
  /**
   * Task setup
   */
  const { taskListStatus, taskList } = useTask();

  /**
   * Appointment setup
   */
  const { appointmentList, appointmentListStatus } = useAppointment();

  /**
   * Completed task setup
   */
  const {
    completedTaskList,
    completedTaskListStatus,
    referenceDate,
    setReferenceDate,
  } = useDay();

  /**
   * Reminder list
   */
  const { isLoadingReminderList, reminderList } =
    useRoutineMainViewReminderList({
      completedTaskList,
      completedTaskListStatus,
      referenceDate,
      taskList,
      taskListStatus,
    });

  /**
   * Item list
   */
  const { isLoadingItemList, itemList } = useRoutineMainViewItemList({
    appointmentList,
    appointmentListStatus,
    completedTaskList,
    completedTaskListStatus,
    referenceDate,
    taskList,
    taskListStatus,
  });

  /**
   * Toggle item
   */
  const { isTogglingItem, onToggleItem } = useRoutineMainViewToggleItem({
    referenceDate,
  });

  /**
   * Progress bar
   */
  const { completedCount, totalCount } = useRoutineMainViewProgressBar({
    itemList,
    reminderList,
  });

  return {
    referenceDate,
    setReferenceDate,
    reminderList,
    isLoadingReminderList,
    itemList,
    isLoadingItemList,
    onToggleItem,
    isTogglingItem,
    totalCount,
    completedCount,
  };
};
