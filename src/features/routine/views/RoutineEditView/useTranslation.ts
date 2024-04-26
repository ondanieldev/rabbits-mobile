import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useRoutineEditViewTranslation = () => {
  /**
   * Translation
   */
  const { t } = useTranslation('routine');
  const searchLabel = useMemo(() => t('searchByName'), [t]);

  /**
   * Return
   */
  return {
    searchLabel,
  };
};
