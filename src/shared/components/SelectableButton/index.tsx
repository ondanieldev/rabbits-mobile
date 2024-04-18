import { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';

import { selectableButtonStyles } from './styles';

export interface SelectableButtonProps {
  children: React.ReactNode;
  isSelected?: boolean;
  styles?: {
    touchable?: StyleProp<ViewStyle>;
    view?: StyleProp<ViewStyle>;
  };
  onPress: () => void;
}

export const SelectableButton: React.FC<SelectableButtonProps> = ({
  children,
  isSelected,
  styles,
  onPress,
}) => {
  const viewStyle = useMemo(() => {
    const firstCompose = StyleSheet.compose(
      selectableButtonStyles.root,
      styles?.view,
    );
    if (isSelected) {
      return StyleSheet.compose(firstCompose, selectableButtonStyles.selected);
    }
    return firstCompose;
  }, [isSelected, styles]);

  return (
    <TouchableHighlight style={styles?.touchable} onPress={onPress}>
      <View style={viewStyle}>{children}</View>
    </TouchableHighlight>
  );
};
