import React from 'react';
import { Text, View } from 'react-native';

import { SelectableItem } from '../../../../shared/components/SelectableItem';
import { ItemData } from '../../interfaces/ItemData';
import { reminderItemStyles } from './styles';
import { useReminderItem } from './use';

export interface ReminderItemProps {
  data: ItemData;
}

// add edit mode
export const ReminderItem: React.FC<ReminderItemProps> = props => {
  const {} = useReminderItem(props);

  return (
    // change onPress based on editMode
    <SelectableItem
      defaultSelected={props.data.isCompleted}
      onToggle={() => {}}>
      <View style={reminderItemStyles.contentContainer}>
        <Text style={reminderItemStyles.name}>{props.data.name}</Text>
      </View>
    </SelectableItem>
  );
};
