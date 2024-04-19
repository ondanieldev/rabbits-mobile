import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { InputError } from '../InputError';
import { InputLabel } from '../InputLabel';
import { baseTextInputStyles } from './styles';
import { useBaseTextInput } from './use';

export interface BaseTextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  errorMsg?: string;
}

export const BaseTextInput: React.FC<BaseTextInputProps> = ({
  label,
  errorMsg,
  ...props
}) => {
  const { onBlur, onFocus, styles } = useBaseTextInput({
    onBlur: props.onBlur,
    onFocus: props.onFocus,
  });

  return (
    <View style={baseTextInputStyles.container}>
      {label && <InputLabel>{label}</InputLabel>}

      <RNTextInput
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
        {...props}
      />

      {errorMsg && <InputError>{errorMsg}</InputError>}
    </View>
  );
};
