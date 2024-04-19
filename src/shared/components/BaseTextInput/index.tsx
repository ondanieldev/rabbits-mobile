import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { colors } from '../../styles/globalStyles';
import { IconButton } from '../IconButton';
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
  onBlur: propOnBlur,
  onFocus: propOnFocus,
  secureTextEntry = false,
  ...props
}) => {
  const { onBlur, onFocus, styles, showSecureText, setShowSecureText } =
    useBaseTextInput({
      onBlur: propOnBlur,
      onFocus: propOnFocus,
      secureTextEntry,
    });

  return (
    <View style={baseTextInputStyles.container}>
      {label && <InputLabel>{label}</InputLabel>}

      <View style={baseTextInputStyles.inputContainer}>
        <RNTextInput
          onFocus={onFocus}
          onBlur={onBlur}
          style={styles.input}
          secureTextEntry={secureTextEntry && !showSecureText}
          {...props}
        />

        {secureTextEntry && (
          <IconButton
            iconProps={{
              name: showSecureText ? 'eye-off' : 'eye',
              size: 25,
              color: colors.selectable,
            }}
            buttonProps={{
              style: baseTextInputStyles.secureIconButton,
              onPress: () => {
                setShowSecureText(prev => !prev);
              },
            }}
          />
        )}
      </View>

      {errorMsg && <InputError>{errorMsg}</InputError>}
    </View>
  );
};
