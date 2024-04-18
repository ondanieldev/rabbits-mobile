import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { format, isToday } from 'date-fns';

import { RoutineTitleProps } from '.';

export type RoutineTitleHook = (props: RoutineTitleProps) => {
  title: string;
};

export const useRoutineTitle: RoutineTitleHook = ({ referenceDate }) => {
  const { t } = useTranslation(['common', 'routine']);

  const title = useMemo(
    () =>
      isToday(referenceDate)
        ? t('today', { ns: 'routine' })
        : `${format(referenceDate, 'dd')} ${t(format(referenceDate, 'MMMM'), {
            ns: 'common',
          })}`,
    [referenceDate, t],
  );

  return {
    title,
  };
};
