import { useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { circleIconButtonStyles } from './styles';

export const useCircleIconButton = ({
  style: buttonStyle,
}: {
  style?: StyleProp<ViewStyle> | undefined;
}) => {
  const styles = useMemo(
    () => ({
      button: StyleSheet.compose(circleIconButtonStyles.touchable, buttonStyle),
    }),
    [buttonStyle],
  );

  return {
    styles,
  };
};
