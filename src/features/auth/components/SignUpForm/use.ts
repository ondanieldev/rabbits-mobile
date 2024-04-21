import { useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignUpSchema, signUpSchema } from '../../schemas/signUpSchema';

export type SignUpFormHook = () => {
  emailLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  buttonText: string;
  form: UseFormReturn<SignUpSchema>;
};

export const useSignUpForm: SignUpFormHook = () => {
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
  };
};
