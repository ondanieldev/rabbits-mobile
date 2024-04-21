import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { useTask } from '../../contexts/taskContext';
import {
  appointmentListAsItemDataList,
  habitListAsItemDataList,
} from '../../data';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { ItemData } from '../../interfaces/ItemData';
import { deleteTask } from '../../stores/taskStore';
import { ItemDataUtils } from '../../utils/ItemDataUtils';

export const useRoutineEditView = () => {
  const { t } = useTranslation('routine');
  const searchLabel = useMemo(() => t('searchByName'), [t]);

  const navigation = useNavigation<StackNavigationProp>();

  const { taskList } = useTask();

  const dispatch = useDispatch();
  const deleteTaskStatus = useSelector(state => state.task.deleteTaskStatus);

  const isDeleting = useMemo(
    () => deleteTaskStatus === 'pending',
    [deleteTaskStatus],
  );

  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  const itemDataList = useMemo<ItemData[]>(() => {
    if (selectedCreatableType === 'habit') {
      return habitListAsItemDataList;
    }

    if (selectedCreatableType === 'reminder') {
      return taskList
        .filter(task => task.kind === 'reminder')
        .map(task => ItemDataUtils.fromTaskToItemData(task));
    }

    if (selectedCreatableType === 'event') {
      return appointmentListAsItemDataList;
    }

    return [];
  }, [selectedCreatableType, taskList]);

  const onSelect = useCallback(
    (data: ItemData) => {
      navigation.navigate('RoutineUpsertScreen', { taskId: data.id });
    },
    [navigation],
  );

  const onDelete = useCallback(
    async (data: ItemData) => {
      try {
        if (data.objectType === 'task') {
          dispatch(deleteTask(data.id));
        }
      } catch {
        //
      }
    },
    [dispatch],
  );

  return {
    selectedCreatableType,
    setSelectedCreatableType,
    itemDataList,
    searchLabel,
    onSelect,
    onDelete,
    isDeleting,
  };
};
