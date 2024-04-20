import { useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { useAsync } from '../../../../shared/hooks/useAsync';
import { User } from '../../../../shared/interfaces/User';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { SignUpSchema, signUpSchema } from '../../schemas/signUpSchema';
import { AuthService } from '../../services/AuthService';

export type SignUpFormHook = () => {
  emailLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  buttonText: string;
  form: UseFormReturn<SignUpSchema>;
  signUp: (data: SignUpSchema) => Promise<User | null>;
  isLoadingSignUp: boolean;
};

export const useSignUpForm: SignUpFormHook = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const { fetch: signUp, isLoading: isLoadingSignUp } = useAsync(
    AuthService.signUp,
    {
      errorOptions: {
        showAlert: true,
        title: 'signUpError',
      },
      onSuccess: () => {
        navigation.navigate('AuthSignInScreen', {});
      },
    },
  );

  const { t } = useTranslation('auth');

  const emailLabel = useMemo(() => t('email'), [t]);
  const passwordLabel = useMemo(() => t('password'), [t]);
  const confirmPasswordLabel = useMemo(() => t('confirmPassword'), [t]);
  const buttonText = useMemo(() => t('signUp'), [t]);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  return {
    emailLabel,
    passwordLabel,
    confirmPasswordLabel,
    buttonText,
    form,
    signUp,
    isLoadingSignUp,
  };
};
