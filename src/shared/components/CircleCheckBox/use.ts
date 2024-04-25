import { useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { CircleCheckBoxProps } from '.';
import { circleCheckBoxStyles } from './styles';

type Styles = {
  container: StyleProp<ViewStyle>;
};

export type CircleCheckBoxHook = (props: CircleCheckBoxProps) => {
  styles: Styles;
};

export const useCircleCheckBox: CircleCheckBoxHook = ({
  isChecked,
  isLoading,
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

  return {
    styles,
  };
};
