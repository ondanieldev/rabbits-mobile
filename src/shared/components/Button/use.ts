import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { ButtonProps } from '.';
import { baseButtonStyles } from './styles';

export const useButton = ({
  isLoading,
  style,
}: Pick<ButtonProps, 'style' | 'isLoading'>) => {
  const styles = useMemo(() => {
    return {
      button: StyleSheet.compose(
        baseButtonStyles.touchable,
        StyleSheet.compose(
          style,
          isLoading && baseButtonStyles.touchableDisabled,
        ),
      ),
    };
  }, [isLoading, style]);

  return {
    styles,
  };
};
