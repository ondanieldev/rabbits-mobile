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
  props: Pick<BaseTextInputProps, 'onBlur' | 'onFocus' | 'secureTextEntry'>,
) => {
  isSelected: boolean;
  onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  styles: Styles;
  showSecureText: boolean;
  setShowSecureText: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useBaseTextInput: BaseTextInputHook = ({
  onBlur: propOnBlur,
  onFocus: propOnFocus,
  secureTextEntry,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [showSecureText, setShowSecureText] = useState(!secureTextEntry);

  const onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsSelected(true);
      propOnFocus?.(e);
    },
    [propOnFocus],
  );

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsSelected(false);
      propOnBlur?.(e);
    },
    [propOnBlur],
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
    showSecureText,
    setShowSecureText,
  };
};
