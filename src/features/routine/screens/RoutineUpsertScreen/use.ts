import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StackRouteConfig } from '../../../../shared/navigation/stack';
import { appStyles } from '../../../../shared/styles/appStyles';
import { RoutineUpsertView } from '../../views/RoutineUpsertView';

export type RoutineUpsertScreenParams = {
  taskId?: string;
};

export type RoutineUpsertScreenHook =
  () => StackRouteConfig<'RoutineUpsertScreen'>;

export const useRoutineUpsertScreen: RoutineUpsertScreenHook = () => {
  const { t } = useTranslation('routine');

  const title = useMemo(() => t('editRoutineScreenTitle'), [t]);

  return {
    name: 'RoutineUpsertScreen',
    component: RoutineUpsertView,
    options: {
      title,
      headerStyle: appStyles.header,
      headerTintColor: appStyles.header.color,
    },
  };
};
