import React from 'react';
import { Text, View } from 'react-native';

import { CircleCheckBox } from '../../../../shared/components/CircleCheckBox';
import {
  SelectableItem,
  SelectableItemStyles,
} from '../../../../shared/components/SelectableItem';
import { ItemData } from '../../interfaces/ItemData';
import { itemStyles } from './styles';
import { useItem } from './use';

export interface ItemProps {
  data: ItemData;
  isEditing?: boolean;
  selectableItemStyles?: SelectableItemStyles;
}

// add edit mode
export const Item: React.FC<ItemProps> = props => {
  const { dateText, styles } = useItem(props);

  return (
    // change onPress based on editMode
    <SelectableItem
      onToggle={() => {}}
      styles={props.selectableItemStyles}
      defaultSelected={props.data.isCompleted}>
      <View style={itemStyles.contentContainer}>
        {!props.isEditing && (
          <CircleCheckBox defaultChecked={props.data.isCompleted} />
        )}
        {/* Selectable when !isEditMode */}
        {/* Trash when isEditMode */}

        <View style={itemStyles.textContainer}>
          <Text style={styles.name}>{props.data.name}</Text>

          {/* stop using mock for time */}
          {/* add date when appointment and edit mode */}
          <Text style={styles.date}>{dateText}</Text>
        </View>
      </View>
    </SelectableItem>
  );
};
