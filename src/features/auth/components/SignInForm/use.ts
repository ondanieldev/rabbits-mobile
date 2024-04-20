import { useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';

import { useAsync } from '../../../../shared/hooks/useAsync';
import { mmkvStorage } from '../../../../shared/storage/mmkv';
import { AccessToken } from '../../interfaces/AccessToken';
import { SignInSchema, signInSchema } from '../../schemas/signInSchema';
import { AuthService } from '../../services/AuthService';

export type SignInFormHook = () => {
  emailLabel: string;
  passwordLabel: string;
  buttonText: string;
  form: UseFormReturn<SignInSchema>;
  signIn: (input: SignInSchema) => Promise<AccessToken | null>;
};

export const useSignInForm: SignInFormHook = () => {
  const { fetch: signIn } = useAsync<AccessToken, SignInSchema>(
    AuthService.signIn,
    {
      errorOptions: {
        title: 'signInError',
        showAlert: true,
      },
      onSuccess: response => {
        mmkvStorage.set('accessToken', response.accessToken);
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
    signIn,
  };
};
