import { FormProvider, UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';

import { formStyles } from './styles';

export interface FormProps {
  form: UseFormReturn<any>;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ form, children }) => {
  return (
    <FormProvider {...form}>
      <View style={formStyles.container}>{children}</View>
    </FormProvider>
  );
};
