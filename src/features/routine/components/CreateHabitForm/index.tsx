import { Button } from '../../../../shared/components/Button';
import { DateTimePicker } from '../../../../shared/components/DateTimePicker';
import { DayOfWeekInput } from '../../../../shared/components/DayOfWeekInput';
import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextInput } from '../../../../shared/components/TextInput';
import { useCreateHabitForm } from './use';

export const CreateHabitForm: React.FC = () => {
  const {
    buttonText,
    daysOfWeekLabel,
    formatTime,
    nameLabel,
    timeLabel,
    form,
    onSubmit,
  } = useCreateHabitForm();

  return (
    <Form form={form}>
      <TextInput form={form} label={nameLabel} name="name" />

      <Divider />

      <DateTimePicker
        mode="time"
        name="time"
        form={form}
        baseTextInputProps={{ label: timeLabel }}
        formatDisplayedValue={formatTime}
      />

      <Divider />

      <DayOfWeekInput form={form} label={daysOfWeekLabel} name="daysOfWeek" />

      <Divider />

      <Button onPress={form.handleSubmit(onSubmit)}>{buttonText}</Button>
    </Form>
  );
};
