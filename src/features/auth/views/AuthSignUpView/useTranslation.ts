import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useAuthSignUpViewTranslation = () => {
  const { t } = useTranslation('auth');

  const titleBase = useMemo(() => t('signUpTo'), [t]);
  const titleHighlight = useMemo(() => t('habits'), [t]);

  const ctaBase = useMemo(() => t('signInCTA'), [t]);
  const ctaHighlight = useMemo(() => t('signInLink'), [t]);

  return {
    titleBase,
    titleHighlight,
    ctaBase,
    ctaHighlight,
  };
};
