import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { ItemData } from '../../interfaces/ItemData';

export const useRoutineEditViewSelectItem = () => {
  /**
   * Navigation setup
   */
  const navigation = useNavigation<StackNavigationProp>();

  /**
   * Select task or appointment
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
   * Return
   */
  return {
    onSelect,
  };
};
