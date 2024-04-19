import React from 'react';
import {
  StyleProp,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';

import { CircleCheckBox } from '../../../../shared/components/CircleCheckBox';
import { IconButton } from '../../../../shared/components/IconButton';
import { Overlay } from '../../../../shared/components/Overlay';
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
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}

// add edit mode
export const Item: React.FC<ItemProps> = props => {
  const { dateText, styles } = useItem(props);

  return (
    // change onPress based on editMode
    <TouchableHighlight
      disabled={!props.isEditing}
      onPress={() => props.onSelect?.(props.data.id)}
      style={styles.touchable}>
      <View>
        {!props.isEditing && props.data.isCompleted && <Overlay />}

        <View style={itemStyles.contentContainer}>
          {!props.isEditing && (
            <CircleCheckBox
              isChecked={props.data.isCompleted}
              onToggle={() => props.onToggle?.(props.data.id)}
            />
          )}

          {props.isEditing && (
            <IconButton
              buttonProps={{
                onPress: () => props.onDelete?.(props.data.id),
              }}
              iconProps={{
                name: 'trash',
                color: colors.danger,
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
