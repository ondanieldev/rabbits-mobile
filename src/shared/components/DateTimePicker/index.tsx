import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import BaseDateTimePicker, {
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';

import { BaseTextInput, BaseTextInputProps } from '../BaseTextInput';
import { useDateTimePicker } from './use';

export interface DateTimePickerProps<T extends FieldValues> {
  mode: AndroidNativeProps['mode'];
  name: string;
  form: UseFormReturn<T>;
  baseTextInputProps: BaseTextInputProps;
  formatDisplayedValue?: (value: Date) => string;
}

// TODO: move logic to a hook and check regulatedDate
export const DateTimePicker: React.FC<DateTimePickerProps<any>> = ({
  mode,
  name,
  form,
  baseTextInputProps,
  formatDisplayedValue,
}) => {
  const { setShow, show } = useDateTimePicker();

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <View>
          <Pressable onPress={() => setShow(true)}>
            <BaseTextInput
              {...baseTextInputProps}
              value={
                formatDisplayedValue
                  ? formatDisplayedValue(field.value)
                  : String(field.value)
              }
              errorMsg={error?.message}
              editable={false}
            />
          </Pressable>

          {show && (
            <BaseDateTimePicker
              value={field.value}
              mode={mode}
              is24Hour={true}
              onChange={(_, date) => {
                if (date) {
                  field.onChange(date);
                  setShow(false);
                }
              }}
            />
          )}
        </View>
      )}
    />
  );
};
