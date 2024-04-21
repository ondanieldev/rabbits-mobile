import { DayOfWeekInput } from '../../../../shared/components/DayOfWeekInput';
import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { useCreateReminderForm } from './use';

export const CreateReminderForm: React.FC = () => {
  const { buttonText, daysOfWeekLabel, nameLabel, form, onSubmit } =
    useCreateReminderForm();

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
