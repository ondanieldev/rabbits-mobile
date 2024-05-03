import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { useUpdateEmailForm } from './use';
import { useUpdateEmailFormTranslation } from './useTranslation';

export const UpdateEmailForm: React.FC = () => {
  const { form, isLoading, onSubmit } = useUpdateEmailForm();

  const { updateEmailbuttonText, emailLabel } = useUpdateEmailFormTranslation();

  return (
    <Form form={form}>
      <TextInput form={form} label={emailLabel} name="email" />

      <Divider />

      <TextButton isLoading={isLoading} onPress={form.handleSubmit(onSubmit)}>
        {updateEmailbuttonText}
      </TextButton>
    </Form>
  );
};
