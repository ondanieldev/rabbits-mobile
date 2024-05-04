import { useCallback } from 'react';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { DateUtils } from '../../../../shared/utils/DateUtils';
import { ItemData } from '../../interfaces/ItemData';
import { updateAppointment } from '../../stores/appointmentStore';
import {
  createCompletedTask,
  deleteCompletedTask,
} from '../../stores/completedTaskStore';

export const useRoutineMainViewToggleItem = ({
  referenceDate,
}: {
  referenceDate: Date;
}) => {
  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Loading parts
   */
  const changingRelatedTaskIds = useSelector(
    state => state.completedTask.changingRelatedTaskIds,
  );
  const changingAppointmentIds = useSelector(
    state => state.appointment.changingAppointmentIds,
  );
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
  const isTogglingItem = useCallback(
    (data: ItemData) =>
      (changingRelatedTaskIds.includes(data.id) &&
        createCompletedTaskStatus === 'pending') ||
      (changingRelatedTaskIds.includes(data.id) &&
        deleteCompletedTaskStatus === 'pending') ||
      (changingAppointmentIds.includes(data.id) &&
        updateAppointmentStatus === 'pending'),
    [
      createCompletedTaskStatus,
      deleteCompletedTaskStatus,
      updateAppointmentStatus,
      changingRelatedTaskIds,
      changingAppointmentIds,
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
