import { useEffect, useState } from 'react';

import { RoutineUpsertViewProps } from '.';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { selectTask } from '../../stores/taskStore';

export const useRoutineUpsertView = ({ route }: RoutineUpsertViewProps) => {
  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  const editingTask = useSelector(state =>
    selectTask(state, route.params.taskId || ''),
  );

  useEffect(() => {
    if (editingTask) {
      setSelectedCreatableType(editingTask.kind);
    }
  }, [editingTask]);

  return {
    selectedCreatableType,
    setSelectedCreatableType,
    editingTask,
  };
};
