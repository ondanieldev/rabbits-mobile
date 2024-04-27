import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { InputError } from '../InputError';
import { InputLabel } from '../InputLabel';
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
  const { error, selectableList } = useDayOfWeekInput({
    form,
    name,
  });

  return (
    <View style={dayOfWeekInputStyles.container}>
      {label && <InputLabel>{label}</InputLabel>}

      <ScrollView
        horizontal={true}
        contentContainerStyle={dayOfWeekInputStyles.listContainer}>
        {selectableList}
      </ScrollView>

      {error && <InputError>{error}</InputError>}
    </View>
  );
};
