import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useUpdateEmailViewTranslation = () => {
  const { t } = useTranslation('auth');
  const titleBase = useMemo(() => t('updateEmailTitle'), [t]);
  const ctaHighlight = useMemo(() => t('verifyEmailCtaHighlight'), [t]);

  return {
    titleBase,
    ctaHighlight,
  };
};
