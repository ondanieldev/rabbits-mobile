import { useCallback, useState } from 'react';

import { RoutineTitle } from '../../features/routine/components/RoutineTitle';
import { RoutineManagerButtons } from '../../features/routine/components/RoutineManagerButtons';

export type AppHook = () => {
  routineScreen: {
    getHeaderRight: () => React.ReactNode;
    getHeaderTitle: () => React.ReactNode;
    referenceDate: Date;
    setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
  };
};

export const useApp: AppHook = () => {
  const [referenceDate, setReferenceDate] = useState(new Date());

  const getHeaderRight = useCallback(() => <RoutineManagerButtons />, []);

  const getHeaderTitle = useCallback(
    () => <RoutineTitle referenceDate={referenceDate} />,
    [referenceDate],
  );

  return {
    routineScreen: {
      getHeaderRight,
      getHeaderTitle,
      referenceDate,
      setReferenceDate,
    },
  };
};
