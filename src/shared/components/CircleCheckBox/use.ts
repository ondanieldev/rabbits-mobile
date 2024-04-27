import { useCallback, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { CircleCheckBoxProps } from '.';
import { colors } from '../../styles/globalStyles';
import { circleCheckBoxStyles } from './styles';

type Styles = {
  container: StyleProp<ViewStyle>;
};

export type CircleCheckBoxHook = (props: CircleCheckBoxProps) => {
  activityIndicatorColor: string;
  styles: Styles;
  onPress: () => void;
};

export const useCircleCheckBox: CircleCheckBoxHook = ({
  isChecked,
  isLoading,
  onToggle,
}) => {
  const styles = useMemo<Styles>(() => {
    let container: StyleProp<ViewStyle> = circleCheckBoxStyles.container;

    if (isChecked) {
      container = StyleSheet.compose(
        container,
        circleCheckBoxStyles.containerChecked,
      );
    }

    if (isLoading) {
      container = StyleSheet.compose(
        container,
        circleCheckBoxStyles.containerLoading,
      );
    }

    return {
      container,
    };
  }, [isChecked, isLoading]);

  const activityIndicatorColor = useMemo(
    () => (isChecked ? colors.background : colors.primary),
    [isChecked],
  );

  const onPress = useCallback(() => {
    onToggle?.(!isChecked);
  }, [onToggle, isChecked]);

  return {
    styles,
    onPress,
    activityIndicatorColor,
  };
};
