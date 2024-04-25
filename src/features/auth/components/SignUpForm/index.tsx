import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { useSignUpForm } from './use';

export const SignUpForm: React.FC = () => {
  const {
    emailLabel,
    passwordLabel,
    confirmPasswordLabel,
    buttonText,
    form,
    onSubmit,
    signUpStatus,
  } = useSignUpForm();

  return (
    <Form form={form}>
      <TextInput form={form} label={emailLabel} name="email" />

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

      <TextButton
        isLoading={signUpStatus === 'pending'}
        onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
