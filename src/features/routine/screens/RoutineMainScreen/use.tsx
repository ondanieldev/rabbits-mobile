import { useCallback } from 'react';

import { StackRouteConfig } from '../../../../shared/navigation/stack';
import { appStyles } from '../../../../shared/styles/appStyles';
import { RoutineManagerButtons } from '../../components/RoutineManagerButtons';
import { RoutineTitle } from '../../components/RoutineTitle';
import { useDay } from '../../contexts/dayContext';
import { RoutineMainView } from '../../views/RoutineMainView';

export type RoutineMainScreenHook = () => StackRouteConfig<'RoutineMainScreen'>;

export const useRoutineMainScreen: RoutineMainScreenHook = () => {
  const { referenceDate } = useDay();

  const getHeaderRight = useCallback(() => <RoutineManagerButtons />, []);

  const getHeaderTitle = useCallback(
    () => <RoutineTitle referenceDate={referenceDate} />,
    [referenceDate],
  );

  return {
    component: RoutineMainView,
    name: 'RoutineMainScreen',
    options: {
      headerRight: () => getHeaderRight(),
      headerTitle: () => getHeaderTitle(),
      headerStyle: appStyles.header,
    },
  };
};
