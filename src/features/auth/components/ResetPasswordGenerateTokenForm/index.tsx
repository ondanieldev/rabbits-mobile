import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { useResetPasswordGenerateTokenForm } from './use';
import { useResetPasswordGenerateTokenFormTranslation } from './useTranslation';

export interface ResetPasswordGenerateTokenFormProps {
  email?: string;
}

export const ResetPasswordGenerateTokenForm: React.FC<
  ResetPasswordGenerateTokenFormProps
> = props => {
  const { form, onSubmit, isLoading } =
    useResetPasswordGenerateTokenForm(props);

  const { buttonText, emailLabel } =
    useResetPasswordGenerateTokenFormTranslation();

  return (
    <Form form={form}>
      <TextInput form={form} label={emailLabel} name="email" />

      <Divider />

      <TextButton isLoading={isLoading} onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
