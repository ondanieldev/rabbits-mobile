import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { Switch, View } from 'react-native';

import { colors } from '../../styles/globalStyles';
import { InputError } from '../InputError';
import { InputLabel } from '../InputLabel';
import { switchBaseProps } from './data';
import { switchStyles } from './styles';

export interface SwitchInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: string;
  label?: string;
}

export const SwitchInput: React.FC<SwitchInputProps<any>> = ({
  form,
  name,
  label,
}) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={switchStyles.outterContainer}>
          <View style={switchStyles.innerContainer}>
            <Switch
              {...switchBaseProps}
              thumbColor={value ? colors.primary : colors.selectable}
              onValueChange={onChange}
              value={value}
            />

            {label && <InputLabel>{label}</InputLabel>}
          </View>

          {error?.message && <InputError>{error.message}</InputError>}
        </View>
      )}
    />
  );
};
