import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useResetPasswordViewTranslation = () => {
  const { t } = useTranslation('auth');

  const titleBase = useMemo(() => t('resetPassword'), [t]);

  return {
    titleBase,
  };
};
