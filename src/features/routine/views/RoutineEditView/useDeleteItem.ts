import { useCallback, useMemo } from 'react';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { ItemData } from '../../interfaces/ItemData';
import { deleteAppointment } from '../../stores/appointmentStore';
import { deleteTask } from '../../stores/taskStore';

export const useRoutineEditViewDeleteItem = () => {
  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Loading parts
   */
  const deleteTaskStatus = useSelector(state => state.task.deleteTaskStatus);
  const deleteAppointmentStatus = useSelector(
    state => state.appointment.deleteAppointmentStatus,
  );

  /**
   * Loading result
   */
  const isDeleting = useMemo(
    () =>
      deleteTaskStatus === 'pending' || deleteAppointmentStatus === 'pending',
    [deleteTaskStatus, deleteAppointmentStatus],
  );

  /**
   * Delete
   */
  const onDelete = useCallback(
    async (data: ItemData) => {
      try {
        if (data.objectType === 'task') {
          dispatch(deleteTask(data.id));
        } else if (data.objectType === 'appointment') {
          dispatch(deleteAppointment(data.id));
        }
      } catch {
        //
      }
    },
    [dispatch],
  );

  /**
   * Return
   */
  return {
    isDeleting,
    onDelete,
  };
};
