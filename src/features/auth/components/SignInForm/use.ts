import { useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';

import { useAsync } from '../../../../shared/hooks/useAsync';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { AuthToken } from '../../interfaces/AuthToken';
import { SignInSchema, signInSchema } from '../../schemas/signInSchema';
import { AuthService } from '../../services/AuthService';
import { AuthTokenStorage } from '../../storages/AuthTokenStorage';
import { setAuthToken } from '../../stores/authStore';

export type SignInFormHook = () => {
  emailLabel: string;
  passwordLabel: string;
  buttonText: string;
  form: UseFormReturn<SignInSchema>;
  isLoadingSignIn: boolean;
  signIn: (input: SignInSchema) => Promise<AuthToken | null>;
};

export const useSignInForm: SignInFormHook = () => {
  const dispatch = useDispatch();

  const { fetch: signIn, isLoading: isLoadingSignIn } = useAsync(
    AuthService.signIn,
    {
      errorOptions: {
        title: 'signInError',
        showAlert: true,
      },
      onSuccess: response => {
        AuthTokenStorage.set(response);
        dispatch(setAuthToken(response));
      },
    },
  );

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
