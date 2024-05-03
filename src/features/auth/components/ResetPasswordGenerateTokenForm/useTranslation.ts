import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useResetPasswordGenerateTokenFormTranslation = () => {
  const { t } = useTranslation('auth');
  const emailLabel = useMemo(() => t('email'), [t]);
  const buttonText = useMemo(() => t('sendToken'), [t]);

  return {
    emailLabel,
    buttonText,
  };
};
