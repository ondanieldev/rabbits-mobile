import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

import { BaseTextInput, BaseTextInputProps } from '../BaseTextInput';

export interface TextInputProps<T extends FieldValues>
  extends BaseTextInputProps {
  form: UseFormReturn<T>;
  name: string;
}

export const TextInput: React.FC<TextInputProps<any>> = ({
  form,
  name,
  label,
  ...props
}) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <BaseTextInput
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          label={label}
          errorMsg={error?.message}
          {...props}
        />
      )}
    />
  );
};
