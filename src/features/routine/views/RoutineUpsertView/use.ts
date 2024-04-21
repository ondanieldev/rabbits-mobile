import { useEffect, useState } from 'react';

import { RoutineUpsertViewProps } from '.';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { selectAppointment } from '../../stores/appointmentStore';
import { selectTask } from '../../stores/taskStore';

export const useRoutineUpsertView = ({ route }: RoutineUpsertViewProps) => {
  /**
   * Select form
   */
  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  /**
   * Select task if there is one being edited
   */
  const editingTask = useSelector(state =>
    selectTask(state, route.params.taskId || ''),
  );

  /**
   * Select appointment if there is one being edited
   */
  const editingAppointment = useSelector(state =>
    selectAppointment(state, route.params.appointmentId || ''),
  );

  /**
   * Set selected creatable type based on editing task or appointment
   */
  useEffect(() => {
    if (editingTask) {
      setSelectedCreatableType(editingTask.kind);
    } else if (editingAppointment) {
      setSelectedCreatableType('event');
    }
  }, [editingTask, editingAppointment]);

  return {
    selectedCreatableType,
    setSelectedCreatableType,
    editingTask,
    editingAppointment,
  };
};
