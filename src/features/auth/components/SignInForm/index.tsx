import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { useSignInForm } from './use';

export const SignInForm: React.FC = () => {
  const {
    emailLabel,
    passwordLabel,
    buttonText,
    form,
    isLoadingSignIn,
    signIn,
  } = useSignInForm();

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
        isLoading={isLoadingSignIn}
        onPress={form.handleSubmit(signIn)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
