import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { CircleCheckBoxProps } from '.';
import { circleCheckBoxStyles } from './styles';

type Styles = {
  container: StyleProp<ViewStyle>;
};

export type CircleCheckBoxHook = (props: CircleCheckBoxProps) => {
  isChecked: boolean;
  handleToggle: () => void;
  styles: Styles;
};

export const useCircleCheckBox: CircleCheckBoxHook = ({ defaultChecked }) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked || false);

  const handleToggle = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

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

  useEffect(() => {
    setIsChecked(!!defaultChecked);
  }, [defaultChecked]);

  return {
    handleToggle,
    isChecked,
    styles,
  };
};
