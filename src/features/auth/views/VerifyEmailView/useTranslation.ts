import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useVerifyEmailViewTranslation = () => {
  const { t } = useTranslation('auth');
  const titleBase = useMemo(() => t('verifyEmailTitle'), [t]);
  const ctaBase = useMemo(() => t('changeEmailCtaBase'), [t]);
  const ctaHighlight = useMemo(() => t('changeEmailCtaHighlight'), [t]);

  return {
    titleBase,
    ctaBase,
    ctaHighlight,
  };
};
