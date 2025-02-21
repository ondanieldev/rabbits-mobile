import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RoutineProgressProps } from '.';

export type useRoutineProgressHook = (data: RoutineProgressProps) => {
  text: string;
  progress: number;
};

export const useRoutineProgress: useRoutineProgressHook = ({
  completedCount,
  totalCount,
}) => {
  const { t } = useTranslation('routine');

  const progress = useMemo(() => {
    const result = completedCount / totalCount;
    if (result < 0 || isNaN(result)) {
      return 0;
    }
    if (result > 1) {
      return 1;
    }
    return result;
  }, [completedCount, totalCount]);

  const text = useMemo(
    () =>
      t('progressBarText')
        .replace('{0}', completedCount.toString())
        .replace('{1}', totalCount.toString()),
    [t, completedCount, totalCount],
  );

  return {
    progress,
    text,
  };
};
