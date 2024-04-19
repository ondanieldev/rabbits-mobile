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

export const useCircleCheckBox: CircleCheckBoxHook = ({ isChecked }) => {
  const styles = useMemo<Styles>(
    () => ({
      container: isChecked
        ? StyleSheet.compose(
            circleCheckBoxStyles.container,
            circleCheckBoxStyles.containerChecked,
          )
        : circleCheckBoxStyles.container,
    }),
    [isChecked],
  );

  return {
    styles,
  };
};
