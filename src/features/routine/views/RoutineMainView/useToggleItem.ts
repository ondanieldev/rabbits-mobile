import { useCallback, useMemo } from 'react';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { DateUtils } from '../../../../shared/utils/DateUtils';
import { ItemData } from '../../interfaces/ItemData';
import { updateAppointment } from '../../stores/appointmentStore';
import {
  createCompletedTask,
  deleteCompletedTask,
} from '../../stores/completedTaskStore';

export type RoutineMainViewToggleItemHook = ({}: { referenceDate: Date }) => {
  isTogglingItem: boolean;
  onToggleItem: (data: ItemData) => void;
};

export const useRoutineMainViewToggleItem: RoutineMainViewToggleItemHook = ({
  referenceDate,
}) => {
  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Loading parts
   */
  const createCompletedTaskStatus = useSelector(
    state => state.completedTask.createCompletedTaskStatus,
  );
  const deleteCompletedTaskStatus = useSelector(
    state => state.completedTask.deleteCompletedTaskStatus,
  );
  const updateAppointmentStatus = useSelector(
    state => state.appointment.updateAppointmentStatus,
  );

  /**
   * Loading result
   */
  const isTogglingItem = useMemo(
    () =>
      createCompletedTaskStatus === 'pending' ||
      deleteCompletedTaskStatus === 'pending' ||
      updateAppointmentStatus === 'pending',
    [
      createCompletedTaskStatus,
      deleteCompletedTaskStatus,
      updateAppointmentStatus,
    ],
  );

  /**
   * Select parts
   */
  const handleSelectTask = useCallback(
    async (data: ItemData) => {
      if (data.isCompleted && data.completedRefId) {
        await dispatch(deleteCompletedTask(data.completedRefId)).unwrap();
      } else {
        const { day, month, year } = DateUtils.splitDate(referenceDate);
        await dispatch(
          createCompletedTask({
            day,
            month,
            year,
            taskId: data.id,
          }),
        ).unwrap();
      }
    },
    [dispatch, referenceDate],
  );

  const handleSelectAppointment = useCallback(
    async (data: ItemData) => {
      await dispatch(
        updateAppointment({
          date: data.date || referenceDate,
          id: data.id,
          isCompleted: !data.isCompleted,
          name: data.name,
        }),
      ).unwrap();
    },
    [dispatch, referenceDate],
  );

  /**
   * Select result
   */
  const onToggleItem = useCallback(
    async (data: ItemData) => {
      if (data.objectType === 'task') {
        handleSelectTask(data);
      } else if (data.objectType === 'appointment') {
        handleSelectAppointment(data);
      }
    },
    [handleSelectTask, handleSelectAppointment],
  );

  return {
    isTogglingItem,
    onToggleItem,
  };
};
