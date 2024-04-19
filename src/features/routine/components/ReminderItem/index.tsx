import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import { Overlay } from '../../../../shared/components/Overlay';
import { ItemData } from '../../interfaces/ItemData';
import { reminderItemStyles } from './styles';

export interface ReminderItemProps {
  data: ItemData;
  onSelect?: (id: string) => void;
}

export const ReminderItem: React.FC<ReminderItemProps> = ({
  data,
  onSelect,
}) => {
  return (
    <TouchableHighlight
      style={reminderItemStyles.container}
      onPress={() => onSelect?.(data.id)}>
      <View style={reminderItemStyles.contentContainer}>
        {data.isCompleted && <Overlay />}
        <Text style={reminderItemStyles.name}>{data.name}</Text>
      </View>
    </TouchableHighlight>
  );
};
