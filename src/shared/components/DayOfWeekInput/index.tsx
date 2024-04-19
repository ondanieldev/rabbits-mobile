import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { InputError } from '../InputError';
import { InputLabel } from '../InputLabel';
import { SelectableDayOfWeek } from '../SelectableDayOfWeek';
import { selectableDayOfWeekDataList } from './data';
import { dayOfWeekInputStyles } from './styles';
import { useDayOfWeekInput } from './use';

export type DayOfWeekInputValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface DayOfWeekInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label?: string;
  name: string;
}

export const DayOfWeekInput: React.FC<DayOfWeekInputProps<any>> = ({
  form,
  label,
  name,
}) => {
  const { onPress } = useDayOfWeekInput();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <View style={dayOfWeekInputStyles.container}>
          {label && <InputLabel>{label}</InputLabel>}

          <ScrollView
            horizontal={true}
            contentContainerStyle={dayOfWeekInputStyles.listContainer}>
            {selectableDayOfWeekDataList.map(data => (
              <SelectableDayOfWeek
                label={data.label}
                onPress={isSelected => {
                  field.value = onPress(field.value, data.value, isSelected);
                }}
              />
            ))}
          </ScrollView>

          {fieldState.error?.message && (
            <InputError>{fieldState.error.message}</InputError>
          )}
        </View>
      )}
    />
  );
};
