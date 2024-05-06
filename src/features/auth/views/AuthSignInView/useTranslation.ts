import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useAuthSignInViewTranslation = () => {
  const { t } = useTranslation('auth');

  const titleBase = useMemo(() => t('signInTo'), [t]);
  const titleHighlight = useMemo(() => t('appName'), [t]);

  const signUpCtaBase = useMemo(() => t('signUpCTA'), [t]);
  const sigUpCtaHighlight = useMemo(() => t('signUpLink'), [t]);

  const resetPasswordCtaBase = useMemo(() => t('resetPasswordCTA'), [t]);
  const resetPasswordCtaHighlight = useMemo(() => t('resetPasswordLink'), [t]);

  return {
    titleBase,
    titleHighlight,
    signUpCtaBase,
    sigUpCtaHighlight,
    resetPasswordCtaBase,
    resetPasswordCtaHighlight,
  };
};
