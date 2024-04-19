import { useCallback, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  TextStyle,
} from 'react-native';

import { BaseTextInputProps } from '.';
import { baseTextInputStyles } from './styles';

type Styles = {
  input: StyleProp<TextStyle>;
};

export type BaseTextInputHook = (
  props: Pick<BaseTextInputProps, 'onBlur' | 'onFocus'>,
) => {
  isSelected: boolean;
  onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  styles: Styles;
};

export const useBaseTextInput: BaseTextInputHook = ({
  onBlur: propOnBlur,
  onFocus: propOnFocus,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsSelected(true);
      propOnBlur?.(e);
    },
    [propOnBlur],
  );

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsSelected(false);
      propOnFocus?.(e);
    },
    [propOnFocus],
  );

  const styles = useMemo<Styles>(
    () => ({
      input: StyleSheet.compose(
        baseTextInputStyles.input,
        isSelected && baseTextInputStyles.inputSelected,
      ),
    }),
    [isSelected],
  );

  return {
    isSelected,
    onFocus,
    onBlur,
    styles,
  };
};
