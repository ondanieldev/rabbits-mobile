import { useTranslation } from 'react-i18next';

import { format } from 'date-fns';

import { Button } from '../../../../shared/components/Button';
import { DateTimePicker } from '../../../../shared/components/DateTimePicker';
import { DayOfWeekInput } from '../../../../shared/components/DayOfWeekInput';
import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextInput } from '../../../../shared/components/TextInput';
import { useCreateHabitForm } from './use';

export const CreateHabitForm: React.FC = () => {
  const { form, onSubmit } = useCreateHabitForm();

  const { t } = useTranslation('routine');

  return (
    <Form form={form}>
      <TextInput id="a" form={form} label={t('name')} name="name" />

      <Divider />

      <DateTimePicker
        mode="time"
        name="time"
        form={form}
        baseTextInputProps={{ label: t('time') }}
        formatDisplayedValue={date => format(date, 'HH:mm')}
      />

      <Divider />

      <DayOfWeekInput form={form} name="daysOfWeek" label="Days of week" />

      <Divider />

      <Button onPress={form.handleSubmit(onSubmit)}>{t('save')}</Button>
    </Form>
  );
};
