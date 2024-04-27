import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useCalendarTranslation = () => {
  const { t } = useTranslation('common');

  const goToTodayText = useMemo(() => t('today'), [t]);

  return {
    goToTodayText,
  };
};
