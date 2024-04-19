import { useCallback, useMemo } from 'react';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignInSchema, signInSchema } from '../../schemas/signInSchema';

export type SignInFormHook = () => {
  emailLabel: string;
  passwordLabel: string;
  buttonText: string;
  form: UseFormReturn<SignInSchema>;
  onSubmit: SubmitHandler<SignInSchema>;
};

export const useSignInForm: SignInFormHook = () => {
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

  const onSubmit = useCallback<SubmitHandler<SignInSchema>>(data => {
    console.log(data);
  }, []);

  return {
    emailLabel,
    passwordLabel,
    buttonText,
    form,
    onSubmit,
  };
};
