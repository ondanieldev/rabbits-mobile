import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useSignInFormTranslation = () => {
  const { t } = useTranslation('auth');
  const emailLabel = useMemo(() => t('email'), [t]);
  const passwordLabel = useMemo(() => t('password'), [t]);
  const buttonText = useMemo(() => t('signIn'), [t]);

  return {
    emailLabel,
    passwordLabel,
    buttonText,
  };
};
