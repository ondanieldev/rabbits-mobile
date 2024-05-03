import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useResetPasswordGenerateTokenViewTranslation = () => {
  const { t } = useTranslation('auth');

  const titleBase = useMemo(() => t('resetPassword'), [t]);

  const ctaHighlight = useMemo(() => t('backToSignIn'), [t]);

  return {
    titleBase,
    ctaHighlight,
  };
};
