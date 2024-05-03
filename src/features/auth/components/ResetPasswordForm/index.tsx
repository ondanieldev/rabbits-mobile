import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { useResetPasswordForm } from './use';
import { useResetPasswordFormTranslation } from './useTranslation';

export interface ResetPasswordFormProps {
  email: string;
  token: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = props => {
  const { form, onSubmit, isLoading } = useResetPasswordForm(props);

  const { buttonText, passwordLabel, confirmPasswordLabel } =
    useResetPasswordFormTranslation();

  return (
    <Form form={form}>
      <TextInput
        form={form}
        label={passwordLabel}
        name="password"
        secureTextEntry={true}
      />

      <TextInput
        form={form}
        label={confirmPasswordLabel}
        name="confirmPassword"
        secureTextEntry={true}
      />

      <Divider />

      <TextButton isLoading={isLoading} onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
