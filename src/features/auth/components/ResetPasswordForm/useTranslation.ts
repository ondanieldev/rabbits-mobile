import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useResetPasswordFormTranslation = () => {
  const { t } = useTranslation('auth');
  const passwordLabel = useMemo(() => t('password'), [t]);
  const confirmPasswordLabel = useMemo(() => t('confirmPassword'), [t]);
  const buttonText = useMemo(() => t('resetPassword'), [t]);

  return {
    passwordLabel,
    confirmPasswordLabel,
    buttonText,
  };
};
