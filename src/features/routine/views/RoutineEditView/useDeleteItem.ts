import { useCallback } from 'react';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import {
  toastErrorDeleteItem,
  toastSuccessDeleteItem,
} from '../../../toast/data/toastTemplates';
import { ItemData } from '../../interfaces/ItemData';
import { deleteAppointment } from '../../stores/appointmentStore';
import { deleteTask } from '../../stores/taskStore';

export const useRoutineEditViewDeleteItem = () => {
  /**
   * Toast setup
   */
  const { toastify } = useToast();

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Loading setup
   */
  const changingTaskIds = useSelector(state => state.task.changingTaskIds);
  const changingAppointmentIds = useSelector(
    state => state.appointment.changingAppointmentIds,
  );

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
  const isDeleting = useCallback(
    (data: ItemData) => {
      return (
        (changingTaskIds.includes(data.id) && deleteTaskStatus === 'pending') ||
        (changingAppointmentIds.includes(data.id) &&
          deleteAppointmentStatus === 'pending')
      );
    },
    [
      deleteTaskStatus,
      deleteAppointmentStatus,
      changingTaskIds,
      changingAppointmentIds,
    ],
  );

  /**
   * Delete
   */
  const onDelete = useCallback(
    async (data: ItemData) => {
      try {
        if (data.objectType === 'task') {
          await dispatch(deleteTask(data.id));
        } else if (data.objectType === 'appointment') {
          await dispatch(deleteAppointment(data.id));
        }
        toastify(toastSuccessDeleteItem);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorDeleteItem(message));
      }
    },
    [dispatch, toastify],
  );

  /**
   * Return
   */
  return {
    isDeleting,
    onDelete,
  };
};
