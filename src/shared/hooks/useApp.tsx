import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RoutineManagerButtons } from '../../features/routine/components/RoutineManagerButtons';
import { RoutineTitle } from '../../features/routine/components/RoutineTitle';

export type AppHook = () => {
  routineScreen: {
    getHeaderRight: () => React.ReactNode;
    getHeaderTitle: () => React.ReactNode;
    referenceDate: Date;
    setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
  };
  addToRoutineScreen: {
    title: string;
  };
  editRoutineScreen: {
    title: string;
  };
};

export const useApp: AppHook = () => {
  const { t } = useTranslation('routine');

  const [referenceDate, setReferenceDate] = useState(new Date());

  const getHeaderRight = useCallback(() => <RoutineManagerButtons />, []);

  const getHeaderTitle = useCallback(
    () => <RoutineTitle referenceDate={referenceDate} />,
    [referenceDate],
  );

  const addToRoutineScreenTitle = useMemo(
    () => t('addToRoutineScreenTitle'),
    [t],
  );

  const editRoutineScreenTitle = useMemo(
    () => t('editRoutineScreenTitle'),
    [t],
  );

  return {
    routineScreen: {
      getHeaderRight,
      getHeaderTitle,
      referenceDate,
      setReferenceDate,
    },
    addToRoutineScreen: {
      title: addToRoutineScreenTitle,
    },
    editRoutineScreen: {
      title: editRoutineScreenTitle,
    },
  };
};
