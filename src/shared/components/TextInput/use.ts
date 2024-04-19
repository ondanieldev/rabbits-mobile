import { useCallback, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  TextStyle,
} from 'react-native';

import { TextInputProps } from '.';
import { textInputStyles } from './styles';

type Styles = {
  input: StyleProp<TextStyle>;
};

export type TextInputHook = (
  props: Pick<TextInputProps<any>, 'onBlur' | 'onFocus'>,
) => {
  isSelected: boolean;
  onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  styles: Styles;
};

export const useTextInput: TextInputHook = ({
  onBlur: propOnBlur,
  onFocus: propOnFocus,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsSelected(true);
      if (propOnBlur) {
        propOnBlur(e);
      }
    },
    [propOnBlur],
  );

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsSelected(false);
      if (propOnFocus) {
        propOnFocus(e);
      }
    },
    [propOnFocus],
  );

  const styles = useMemo<Styles>(
    () => ({
      input: StyleSheet.compose(
        textInputStyles.input,
        isSelected && textInputStyles.inputSelected,
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
