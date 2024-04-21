import { DayOfWeekInput } from '../../../../shared/components/DayOfWeekInput';
import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { Task } from '../../interfaces/Task';
import { useCreateReminderForm } from './use';

export interface CreateReminderFormProps {
  ediditingReminder?: Task;
}

export const CreateReminderForm: React.FC<CreateReminderFormProps> = props => {
  const { buttonText, daysOfWeekLabel, nameLabel, form, onSubmit } =
    useCreateReminderForm(props);

  return (
    <Form form={form}>
      <TextInput form={form} label={nameLabel} name="name" />

      <Divider />

      <DayOfWeekInput form={form} label={daysOfWeekLabel} name="daysOfWeek" />

      <Divider />

      <TextButton onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
