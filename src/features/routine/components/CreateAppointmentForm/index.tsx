import { Button } from '../../../../shared/components/Button';
import { DateTimePicker } from '../../../../shared/components/DateTimePicker';
import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextInput } from '../../../../shared/components/TextInput';
import { useCreateAppointmentForm } from './use';

export const CreateAppointmentForm: React.FC = () => {
  const {
    buttonText,
    dateLabel,
    formatDate,
    formatTime,
    nameLabel,
    timeLabel,
    form,
    onSubmit,
  } = useCreateAppointmentForm();

  return (
    <Form form={form}>
      <TextInput form={form} label={nameLabel} name="name" />

      <Divider />

      <DateTimePicker
        mode="date"
        name="date"
        form={form}
        baseTextInputProps={{ label: dateLabel }}
        formatDisplayedValue={formatDate}
      />

      <DateTimePicker
        mode="time"
        name="time"
        form={form}
        baseTextInputProps={{ label: timeLabel }}
        formatDisplayedValue={formatTime}
      />

      <Divider />

      <Button onPress={form.handleSubmit(onSubmit)}>{buttonText}</Button>
    </Form>
  );
};
