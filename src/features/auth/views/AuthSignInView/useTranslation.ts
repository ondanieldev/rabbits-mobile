import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useAuthSignInViewTranslation = () => {
  const { t } = useTranslation('auth');

  const titleBase = useMemo(() => t('signInTo'), [t]);
  const titleHighlight = useMemo(() => t('habits'), [t]);

  const ctaBase = useMemo(() => t('signUpCTA'), [t]);
  const ctaHighlight = useMemo(() => t('signUpLink'), [t]);

  return {
    titleBase,
    titleHighlight,
    ctaBase,
    ctaHighlight,
  };
};
