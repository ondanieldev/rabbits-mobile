import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { useAppointment } from '../../contexts/appointmentContext';
import { useTask } from '../../contexts/taskContext';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { ItemData } from '../../interfaces/ItemData';
import { deleteAppointment } from '../../stores/appointmentStore';
import { deleteTask } from '../../stores/taskStore';
import { ItemDataUtils } from '../../utils/ItemDataUtils';

export const useRoutineEditView = () => {
  /**
   * Translation
   */
  const { t } = useTranslation('routine');
  const searchLabel = useMemo(() => t('searchByName'), [t]);

  /**
   * Select form
   */
  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  /**
   * Load list
   */
  const { taskList } = useTask();
  const { appointmentList } = useAppointment();

  const [search, setSearch] = useState('');

  const itemDataList = useMemo<ItemData[]>(() => {
    // Function to filter tasks based on search query
    const matchesSearch = (query: string) => {
      if (!search) {
        return true;
      }
      return query.toLowerCase().includes(search.toLowerCase());
    };

    // Habit list
    if (selectedCreatableType === 'habit') {
      return taskList
        .filter(task => task.kind === 'habit' && matchesSearch(task.name))
        .map(task => ItemDataUtils.fromTaskToItemData(task));
    }

    // Reminder list
    if (selectedCreatableType === 'reminder') {
      return taskList
        .filter(task => task.kind === 'reminder' && matchesSearch(task.name))
        .map(task => ItemDataUtils.fromTaskToItemData(task));
    }

    // Appointment list
    if (selectedCreatableType === 'event') {
      return appointmentList
        .filter(appointment => matchesSearch(appointment.name))
        .map(ItemDataUtils.fromAppointmentToItemData);
    }

    return [];
  }, [selectedCreatableType, taskList, search, appointmentList]);

  const taskListStatus = useSelector(state => state.task.taskListStatus);
  const appointmentListStatus = useSelector(
    state => state.appointment.appointmentListStatus,
  );
  const isLoading = useMemo(
    () => taskListStatus === 'pending' || appointmentListStatus === 'pending',
    [taskListStatus, appointmentListStatus],
  );

  /**
   * Redux
   */
  const dispatch = useDispatch();

  /**
   * Select task
   */
  const navigation = useNavigation<StackNavigationProp>();

  const onSelect = useCallback(
    (data: ItemData) => {
      if (data.objectType === 'task') {
        navigation.navigate('RoutineUpsertScreen', { taskId: data.id });
      } else if (data.objectType === 'appointment') {
        navigation.navigate('RoutineUpsertScreen', {
          appointmentId: data.id,
        });
      }
    },
    [navigation],
  );

  /**
   * Delete
   */
  const deleteTaskStatus = useSelector(state => state.task.deleteTaskStatus);
  const deleteAppointmentStatus = useSelector(
    state => state.appointment.deleteAppointmentStatus,
  );

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

  const isDeleting = useMemo(
    () =>
      deleteTaskStatus === 'pending' || deleteAppointmentStatus === 'pending',
    [deleteTaskStatus, deleteAppointmentStatus],
  );

  /**
   * Return
   */
  return {
    searchLabel,
    selectedCreatableType,
    setSelectedCreatableType,
    itemDataList,
    isLoading,
    search,
    setSearch,
    onSelect,
    onDelete,
    isDeleting,
  };
};
