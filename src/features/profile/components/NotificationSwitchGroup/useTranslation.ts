import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useNotificationSwitchGroupTranslation = () => {
  /**
   * Translation
   */
  const { t } = useTranslation('profile');
  const groupLabel = useMemo(() => t('notifications'), [t]);
  const isNotificationEnabledLabel = useMemo(
    () => t('isNotificationEnabledLabel'),
    [t],
  );
  const isSoundEnabledLabel = useMemo(() => t('isSoundEnabledLabel'), [t]);
  const isVibrationEnabledLabel = useMemo(
    () => t('isVibrationEnabledLabel'),
    [t],
  );

  return {
    groupLabel,
    isNotificationEnabledLabel,
    isSoundEnabledLabel,
    isVibrationEnabledLabel,
  };
};
