import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { useTask } from '../../contexts/taskContext';
import { appointmentListAsItemDataList } from '../../data';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { ItemData } from '../../interfaces/ItemData';
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

  const [search, setSearch] = useState('');

  const itemDataList = useMemo<ItemData[]>(() => {
    const matchesSearch = (query: string) => {
      if (!search) {
        return true;
      }
      return query.toLowerCase().includes(search.toLowerCase());
    };

    if (selectedCreatableType === 'reminder') {
      return taskList
        .filter(task => task.kind === 'reminder' && matchesSearch(task.name))
        .map(task => ItemDataUtils.fromTaskToItemData(task));
    }

    if (selectedCreatableType === 'event') {
      return appointmentListAsItemDataList;
    }

    return [];
  }, [selectedCreatableType, taskList, search]);

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
      navigation.navigate('RoutineUpsertScreen', { taskId: data.id });
    },
    [navigation],
  );

  /**
   * Delete task
   */
  const deleteTaskStatus = useSelector(state => state.task.deleteTaskStatus);

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

  const isDeleting = useMemo(
    () => deleteTaskStatus === 'pending',
    [deleteTaskStatus],
  );

  /**
   * Return
   */
  return {
    searchLabel,
    selectedCreatableType,
    setSelectedCreatableType,
    itemDataList,
    search,
    setSearch,
    onSelect,
    onDelete,
    isDeleting,
  };
};
