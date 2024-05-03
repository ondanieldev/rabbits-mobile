import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useResetPasswordValidateTokenFormTranslation = () => {
  const { t } = useTranslation('auth');
  const tokenLabel = useMemo(() => t('token'), [t]);
  const buttonText = useMemo(() => t('validateToken'), [t]);

  return {
    tokenLabel,
    buttonText,
  };
};
