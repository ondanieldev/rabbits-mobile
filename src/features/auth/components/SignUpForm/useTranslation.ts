import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useSignUpFormTranslation = () => {
  const { t } = useTranslation('auth');
  const emailLabel = useMemo(() => t('email'), [t]);
  const passwordLabel = useMemo(() => t('password'), [t]);
  const confirmPasswordLabel = useMemo(() => t('confirmPassword'), [t]);
  const buttonText = useMemo(() => t('signUp'), [t]);

  return {
    emailLabel,
    passwordLabel,
    confirmPasswordLabel,
    buttonText,
  };
};
