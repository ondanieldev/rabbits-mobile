import { DateTimePicker } from '../../../../shared/components/DateTimePicker';
import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { NotificationSwitchGroup } from '../../../profile/components/NotificationSwitchGroup';
import { Appointment } from '../../interfaces/Appointment';
import { useCreateAppointmentForm } from './use';
import { useCreateAppointmentFormTranslation } from './useTranslation';

export interface CreateAppointmentFormProps {
  editingAppointment?: Appointment;
}

export const CreateAppointmentForm: React.FC<
  CreateAppointmentFormProps
> = props => {
  const {
    buttonText,
    dateLabel,
    formatDate,
    formatTime,
    nameLabel,
    timeLabel,
  } = useCreateAppointmentFormTranslation();

  const { form, onSubmit } = useCreateAppointmentForm(props);

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

      <NotificationSwitchGroup form={form} />

      <Divider />

      <TextButton onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
