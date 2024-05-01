import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useUpsertPreferenceFormTranslation = () => {
  /**
   * Translation
   */
  const { t } = useTranslation('profile');
  const notificationsTitle = useMemo(() => t('notifications'), [t]);
  const isNotificationEnabledLabel = useMemo(
    () => t('isNotificationEnabledLabel'),
    [t],
  );
  const isSoundEnabledLabel = useMemo(() => t('isSoundEnabledLabel'), [t]);
  const isVibrationEnabledLabel = useMemo(
    () => t('isVibrationEnabledLabel'),
    [t],
  );
  const buttonText = useMemo(() => t('save'), [t]);

  return {
    notificationsTitle,
    isNotificationEnabledLabel,
    isSoundEnabledLabel,
    isVibrationEnabledLabel,
    buttonText,
  };
};
