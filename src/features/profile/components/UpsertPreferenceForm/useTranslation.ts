import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useUpsertPreferenceFormTranslation = () => {
  /**
   * Translation
   */
  const { t } = useTranslation('profile');
  const buttonText = useMemo(() => t('save'), [t]);

  return {
    buttonText,
  };
};
