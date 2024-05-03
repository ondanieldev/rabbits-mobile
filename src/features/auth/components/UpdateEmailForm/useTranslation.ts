import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useUpdateEmailFormTranslation = () => {
  const { t } = useTranslation('auth');
  const emailLabel = useMemo(() => t('newEmail'), [t]);
  const updateEmailbuttonText = useMemo(() => t('updateEmail'), [t]);

  return {
    emailLabel,
    updateEmailbuttonText,
  };
};
