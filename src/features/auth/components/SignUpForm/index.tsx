import { useNavigation } from '@react-navigation/native';

import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { useAuth } from '../../hooks/useAuth';
import { useSignUpForm } from './use';

export const SignUpForm: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const { isLoadingSignUp, signUp } = useAuth();

  const { emailLabel, passwordLabel, confirmPasswordLabel, buttonText, form } =
    useSignUpForm();

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
        isLoading={isLoadingSignUp}
        onPress={form.handleSubmit(data =>
          signUp(data).then(() => navigation.navigate('AuthSignInScreen', {})),
        )}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
