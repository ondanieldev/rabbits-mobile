import { useCallback, useMemo, useState } from 'react';

import {
  StackRouteConfig,
  StackScreenChildren,
  StackScreenChildrenProps,
} from '../../../../shared/navigation/stack';
import { appStyles } from '../../../../shared/styles/appStyles';
import { RoutineManagerButtons } from '../../components/RoutineManagerButtons';
import { RoutineTitle } from '../../components/RoutineTitle';
import { RoutineMainView } from '../../views/RoutineMainView';

export type RoutineMainScreenHook = () => StackRouteConfig<'RoutineMainScreen'>;

export const useRoutineMainScreen: RoutineMainScreenHook = () => {
  const [referenceDate, setReferenceDate] = useState(new Date());

  const getHeaderRight = useCallback(() => <RoutineManagerButtons />, []);

  const getHeaderTitle = useCallback(
    () => <RoutineTitle referenceDate={referenceDate} />,
    [referenceDate],
  );

  const children = useMemo<StackScreenChildren<'RoutineMainScreen'>>(() => {
    return (props: StackScreenChildrenProps<'RoutineMainScreen'>) => (
      <RoutineMainView
        {...props}
        referenceDate={referenceDate}
        setReferenceDate={setReferenceDate}
      />
    );
  }, [referenceDate]);

  return {
    name: 'RoutineMainScreen',
    options: {
      headerRight: () => getHeaderRight(),
      headerTitle: () => getHeaderTitle(),
      headerStyle: appStyles.header,
    },
    children,
  };
};
