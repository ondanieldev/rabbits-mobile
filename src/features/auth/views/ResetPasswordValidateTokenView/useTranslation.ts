import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ResetPasswordValidateTokenScreenParams } from '.';

export const useResetPasswordValidateTokenViewTranslation = (
  params: ResetPasswordValidateTokenScreenParams,
) => {
  const { t } = useTranslation('auth');

  const titleBase = useMemo(() => t('resetPassword'), [t]);

  const ctaBase = useMemo(
    () => t('tokenSentToEmail').replace('{{email}}', params.email),
    [t, params],
  );
  const ctaHighlight = useMemo(() => t('backToGenerateToken'), [t]);

  return {
    titleBase,
    ctaBase,
    ctaHighlight,
  };
};
