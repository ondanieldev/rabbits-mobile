import { useState } from 'react';

import { useAppointment } from '../../contexts/appointmentContext';
import { useTask } from '../../contexts/taskContext';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { useRoutineEditViewDeleteItem } from './useDeleteItem';
import { useRoutineEditViewItemList } from './useItemList';
import { useRoutineEditViewSelectItem } from './useSelectItem';

export const useRoutineEditView = () => {
  /**
   * Task setup
   */
  const { taskList } = useTask();

  /**
   * Appointment setup
   */
  const { appointmentList } = useAppointment();

  /**
   * Select form
   */
  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  /**
   * Search
   */
  const [search, setSearch] = useState('');

  /**
   * Item list
   */
  const { isLoading, itemDataList } = useRoutineEditViewItemList({
    appointmentList,
    search,
    selectedCreatableType,
    taskList,
  });

  /**
   * Select item
   */
  const { onSelect } = useRoutineEditViewSelectItem();

  /**
   * Delete item
   */
  const { isDeleting, onDelete } = useRoutineEditViewDeleteItem();

  /**
   * Return
   */
  return {
    selectedCreatableType,
    setSelectedCreatableType,
    search,
    setSearch,
    isLoading,
    itemDataList,
    onSelect,
    isDeleting,
    onDelete,
  };
};
