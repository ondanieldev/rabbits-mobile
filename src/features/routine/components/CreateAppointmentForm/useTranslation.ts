import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { format } from 'date-fns';

export const useCreateAppointmentFormTranslation = () => {
  /**
   * Translation
   */
  const { t } = useTranslation(['common', 'routine']);
  const nameLabel = useMemo(() => t('name', { ns: 'routine' }), [t]);
  const dateLabel = useMemo(() => t('date', { ns: 'routine' }), [t]);
  const timeLabel = useMemo(() => t('time', { ns: 'routine' }), [t]);
  const buttonText = useMemo(() => t('save', { ns: 'routine' }), [t]);

  /**
   * Formating
   */
  const formatDate = useCallback(
    (date: Date) =>
      `${format(date, 'dd')} ${t(format(date, 'LLLL'), {
        ns: 'common',
      })} ${format(date, 'yyyy')}`,
    [t],
  );

  const formatTime = useCallback((date: Date) => format(date, 'HH:mm'), []);

  return {
    nameLabel,
    dateLabel,
    timeLabel,
    buttonText,
    formatDate,
    formatTime,
  };
};
