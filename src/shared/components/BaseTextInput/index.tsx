import { Text } from 'react-native';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

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
      {label && <Text style={baseTextInputStyles.label}>{label}</Text>}

      <RNTextInput
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
        {...props}
      />

      {errorMsg && <Text style={baseTextInputStyles.error}>{errorMsg}</Text>}
    </View>
  );
};
