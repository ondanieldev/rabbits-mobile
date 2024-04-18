import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';

import { clickableItemStyles } from './styles';
import { useSelectableItem } from './use';

export type SelectableItemStyles = {
  touchable?: StyleProp<ViewStyle>;
};

export interface SelectableItemProps {
  children: React.ReactNode;
  defaultSelected?: boolean;
  onToggle: () => void;
  styles?: SelectableItemStyles;
}

// add edit mode
export const SelectableItem: React.FC<SelectableItemProps> = props => {
  const { isSelected, handleToggle } = useSelectableItem(props);

  return (
    // change onPress based on editMode
    <TouchableHighlight
      onPress={handleToggle}
      style={StyleSheet.compose(
        clickableItemStyles.touchable,
        props.styles?.touchable,
      )}>
      <View style={clickableItemStyles.container}>
        {isSelected && <View style={clickableItemStyles.overlay} />}

        {props.children}
      </View>
    </TouchableHighlight>
  );
};
