import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { useResetPasswordValidateTokenForm } from './use';
import { useResetPasswordValidateTokenFormTranslation } from './useTranslation';

export interface ResetPasswordValidateTokenFormProps {
  email: string;
}

export const ResetPasswordValidateTokenForm: React.FC<
  ResetPasswordValidateTokenFormProps
> = props => {
  const { form, onSubmit, isLoading } =
    useResetPasswordValidateTokenForm(props);

  const { buttonText, tokenLabel } =
    useResetPasswordValidateTokenFormTranslation();

  return (
    <Form form={form}>
      <TextInput form={form} label={tokenLabel} name="token" />

      <Divider />

      <TextButton isLoading={isLoading} onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
