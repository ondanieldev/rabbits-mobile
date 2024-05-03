import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { useSignInForm } from './use';
import { useSignInFormTranslation } from './useTranslation';

export interface SignInFormProps {
  email?: string;
}

export const SignInForm: React.FC<SignInFormProps> = props => {
  const { form, onSubmit, signInStatus } = useSignInForm(props);

  const { buttonText, emailLabel, passwordLabel } = useSignInFormTranslation();

  return (
    <Form form={form}>
      <TextInput form={form} label={emailLabel} name="email" />

      <TextInput
        form={form}
        label={passwordLabel}
        name="password"
        secureTextEntry={true}
      />

      <Divider />

      <TextButton
        isLoading={signInStatus === 'pending'}
        onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
