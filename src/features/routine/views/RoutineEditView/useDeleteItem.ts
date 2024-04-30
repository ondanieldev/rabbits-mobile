import { useCallback, useMemo } from 'react';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useNotification } from '../../../notification/contexts/notificationContext';
import {
  notificationErrorDeleteItem,
  notificationSuccessDeleteItem,
} from '../../../notification/data/notificationTemplates';
import { ItemData } from '../../interfaces/ItemData';
import { deleteAppointment } from '../../stores/appointmentStore';
import { deleteTask } from '../../stores/taskStore';

export const useRoutineEditViewDeleteItem = () => {
  /**
   * Notification setup
   */
  const { notify } = useNotification();

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
        notify(notificationSuccessDeleteItem);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        notify(notificationErrorDeleteItem(message));
      }
    },
    [dispatch, notify],
  );

  /**
   * Return
   */
  return {
    isDeleting,
    onDelete,
  };
};
