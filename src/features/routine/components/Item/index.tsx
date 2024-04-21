import React from 'react';
import { StyleProp, TouchableHighlight, View, ViewStyle } from 'react-native';

import { CircleCheckBox } from '../../../../shared/components/CircleCheckBox';
import { IconButton } from '../../../../shared/components/IconButton';
import { Overlay } from '../../../../shared/components/Overlay';
import { Text } from '../../../../shared/components/Text';
import { colors } from '../../../../shared/styles/globalStyles';
import { ItemData } from '../../interfaces/ItemData';
import { itemStyles } from './styles';
import { useItem } from './use';

export interface ItemProps {
  data: ItemData;
  isEditing?: boolean;
  styles?: {
    touchable?: StyleProp<ViewStyle>;
  };
  onSelect?: (data: ItemData) => void;
  onDelete?: (data: ItemData) => void;
  onToggle?: (data: ItemData) => void;
  isDeleting?: boolean;
}

// add edit mode
export const Item: React.FC<ItemProps> = props => {
  const { dateText, styles } = useItem(props);

  return (
    // change onPress based on editMode
    <TouchableHighlight
      disabled={!props.isEditing}
      onPress={() => props.onSelect?.(props.data)}
      style={styles.touchable}>
      <View>
        {!props.isEditing && props.data.isCompleted && <Overlay />}

        <View style={itemStyles.contentContainer}>
          {!props.isEditing && (
            <CircleCheckBox
              isChecked={props.data.isCompleted}
              onToggle={() => props.onToggle?.(props.data)}
            />
          )}

          {props.isEditing && (
            <IconButton
              buttonProps={{
                onPress: () => props.onDelete?.(props.data),
                disabled: props.isDeleting,
              }}
              iconProps={{
                name: 'trash',
                color: colors.danger,
                disabledColor: colors.selectable,
              }}
            />
          )}

          <View style={itemStyles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {props.data.name}
            </Text>

            <Text style={styles.date}>{dateText}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
