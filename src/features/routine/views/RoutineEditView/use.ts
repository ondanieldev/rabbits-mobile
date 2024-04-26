import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { SearchUtils } from '../../../../shared/utils/SearchUtils';
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
   * Navigation setup
   */
  const navigation = useNavigation<StackNavigationProp>();

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Select form
   */
  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  /**
   * Load list
   */
  const [search, setSearch] = useState('');

  const { taskList } = useTask();
  const { appointmentList } = useAppointment();

  const taskListStatus = useSelector(state => state.task.taskListStatus);
  const appointmentListStatus = useSelector(
    state => state.appointment.appointmentListStatus,
  );
  const isLoading = useMemo(
    () => taskListStatus === 'pending' || appointmentListStatus === 'pending',
    [taskListStatus, appointmentListStatus],
  );

  const itemDataList = useMemo<ItemData[]>(() => {
    // Habit list
    if (selectedCreatableType === 'habit') {
      return taskList
        .filter(
          task =>
            task.kind === 'habit' &&
            SearchUtils.matchesInsensitve(search, task.name),
        )
        .map(task => ItemDataUtils.fromTaskToItemData(task));
    }

    // Reminder list
    if (selectedCreatableType === 'reminder') {
      return taskList
        .filter(
          task =>
            task.kind === 'reminder' &&
            SearchUtils.matchesInsensitve(search, task.name),
        )
        .map(task => ItemDataUtils.fromTaskToItemData(task));
    }

    // Appointment list
    if (selectedCreatableType === 'event') {
      return appointmentList
        .filter(appointment =>
          SearchUtils.matchesInsensitve(search, appointment.name),
        )
        .map(ItemDataUtils.fromAppointmentToItemData);
    }

    return [];
  }, [selectedCreatableType, taskList, search, appointmentList]);

  /**
   * Select item
   */
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
   * Delete item
   */
  const deleteTaskStatus = useSelector(state => state.task.deleteTaskStatus);
  const deleteAppointmentStatus = useSelector(
    state => state.appointment.deleteAppointmentStatus,
  );
  const isDeleting = useMemo(
    () =>
      deleteTaskStatus === 'pending' || deleteAppointmentStatus === 'pending',
    [deleteTaskStatus, deleteAppointmentStatus],
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
