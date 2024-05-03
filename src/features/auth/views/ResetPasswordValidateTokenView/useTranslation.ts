import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useResetPasswordValidateTokenViewTranslation = () => {
  const { t } = useTranslation('auth');

  const titleBase = useMemo(() => t('resetPassword'), [t]);

  const ctaBase = useMemo(() => t('checkYourEmail'), [t]);
  const ctaHighlight = useMemo(() => t('backToGenerateToken'), [t]);

  return {
    titleBase,
    ctaBase,
    ctaHighlight,
  };
};
