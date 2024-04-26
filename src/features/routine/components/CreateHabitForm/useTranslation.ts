import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { format } from 'date-fns';

export const useCreateHabitFormTranslation = () => {
  /**
   * Translation
   */
  const { t } = useTranslation('routine');
  const nameLabel = useMemo(() => t('name'), [t]);
  const timeLabel = useMemo(() => t('time'), [t]);
  const daysOfWeekLabel = useMemo(() => t('daysOfWeek'), [t]);
  const buttonText = useMemo(() => t('save'), [t]);

  /**
   * Formating
   */
  const formatTime = useCallback((date: Date) => format(date, 'HH:mm'), []);

  return {
    nameLabel,
    timeLabel,
    daysOfWeekLabel,
    buttonText,
    formatTime,
  };
};
