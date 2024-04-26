import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { format } from 'date-fns';

import { CalendarDayProps } from '.';

export const useCalendarDayTranslation = ({ date }: CalendarDayProps) => {
  const { t } = useTranslation('common');

  const day = useMemo(() => format(date, 'dd'), [date]);
  const dayOfWeek = useMemo(() => t(format(date, 'EEE')), [date, t]);

  return {
    day,
    dayOfWeek,
  };
};
