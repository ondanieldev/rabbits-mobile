import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useProfile } from '../../../profile/contexts/profileContext';

export const useVerifyEmailFormTranslation = () => {
  const { profile } = useProfile();

  const { t } = useTranslation('auth');
  const tokenLabel = useMemo(() => t('token'), [t]);
  const resendTokenbuttonText = useMemo(() => t('resendToken'), [t]);
  const verifyEmailbuttonText = useMemo(() => t('verifyEmail'), [t]);
  const tokenSentToEmail = useMemo(
    () => t('tokenSentToEmail').replace('{{email}}', profile?.email || ''),
    [t, profile],
  );

  return {
    tokenLabel,
    resendTokenbuttonText,
    verifyEmailbuttonText,
    tokenSentToEmail,
  };
};
