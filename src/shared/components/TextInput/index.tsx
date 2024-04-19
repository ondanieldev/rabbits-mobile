import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { Text } from 'react-native';
import {
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
  View,
} from 'react-native';

import { textInputStyles } from './styles';
import { useTextInput } from './use';

export interface TextInputProps<T extends FieldValues>
  extends Omit<BaseTextInputProps, 'style'> {
  form: UseFormReturn<T>;
  label?: string;
  name: string;
}

export const TextInput: React.FC<TextInputProps<any>> = ({
  form,
  label,
  name,
  ...props
}) => {
  const { onBlur, onFocus, styles } = useTextInput({
    onBlur: props.onBlur,
    onFocus: props.onFocus,
  });

  return (
    <View style={textInputStyles.container}>
      {label && <Text style={textInputStyles.label}>{label}</Text>}

      <Controller
        control={form.control}
        name={name}
        render={({
          field: { onBlur: formOnBlur, onChange, value },
          fieldState: { error },
        }) => (
          <View style={textInputStyles.container}>
            <BaseTextInput
              onFocus={onFocus}
              onBlur={e => {
                onBlur(e);
                formOnBlur();
              }}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              {...props}
            />

            {error && (
              <Text style={textInputStyles.error}>{error.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};
