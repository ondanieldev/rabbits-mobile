import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useResetPasswordFormTranslation = () => {
  const { t } = useTranslation('auth');
  const passwordLabel = useMemo(() => t('newPassword'), [t]);
  const confirmPasswordLabel = useMemo(() => t('newConfirmPassword'), [t]);
  const buttonText = useMemo(() => t('resetPassword'), [t]);

  return {
    passwordLabel,
    confirmPasswordLabel,
    buttonText,
  };
};
