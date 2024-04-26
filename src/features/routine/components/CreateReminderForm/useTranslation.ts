import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useCreateReminderFormTranslation = () => {
  const { t } = useTranslation('routine');
  const nameLabel = useMemo(() => t('name'), [t]);
  const daysOfWeekLabel = useMemo(() => t('daysOfWeek'), [t]);
  const buttonText = useMemo(() => t('save'), [t]);

  return {
    nameLabel,
    daysOfWeekLabel,
    buttonText,
  };
};
