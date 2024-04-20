import { useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { useAsync } from '../../../../shared/hooks/useAsync';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { AccessToken } from '../../interfaces/AccessToken';
import { SignInSchema, signInSchema } from '../../schemas/signInSchema';
import { AuthService } from '../../services/AuthService';
import { AccessTokenStorage } from '../../storages/AccessTokenStorage';

export type SignInFormHook = () => {
  emailLabel: string;
  passwordLabel: string;
  buttonText: string;
  form: UseFormReturn<SignInSchema>;
  isLoadingSignIn: boolean;
  signIn: (input: SignInSchema) => Promise<AccessToken | null>;
};

export const useSignInForm: SignInFormHook = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const { fetch: signIn, isLoading: isLoadingSignIn } = useAsync<
    AccessToken,
    SignInSchema
  >(AuthService.signIn, {
    errorOptions: {
      title: 'signInError',
      showAlert: true,
    },
    onSuccess: response => {
      AccessTokenStorage.set(response);
      navigation.navigate('RoutineMainScreen', {});
    },
  });

  const { t } = useTranslation('auth');

  const emailLabel = useMemo(() => t('email'), [t]);
  const passwordLabel = useMemo(() => t('password'), [t]);
  const buttonText = useMemo(() => t('signIn'), [t]);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  return {
    emailLabel,
    passwordLabel,
    buttonText,
    form,
    isLoadingSignIn,
    signIn,
  };
};
