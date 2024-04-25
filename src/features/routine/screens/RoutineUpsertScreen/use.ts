import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { StackRouteConfig } from '../../../../shared/navigation/stack';
import { appStyles } from '../../../../shared/styles/appStyles';
import { RoutineUpsertView } from '../../views/RoutineUpsertView';

export type RoutineUpsertScreenParams = {
  taskId?: string;
  appointmentId?: string;
};

export type RoutineUpsertScreenHook =
  () => StackRouteConfig<'RoutineUpsertScreen'>;

export const useRoutineUpsertScreen: RoutineUpsertScreenHook = () => {
  const { t } = useTranslation('routine');

  const headerTitle = useCallback(
    (params: RoutineUpsertScreenParams) => {
      if (params.taskId || params.appointmentId) {
        return t('routineUpdateScreenTitle');
      }
      return t('routineAddScreenTitle');
    },
    [t],
  );

  return {
    name: 'RoutineUpsertScreen',
    component: RoutineUpsertView,
    options: ({ route }) => ({
      headerStyle: appStyles.header,
      headerTintColor: appStyles.header.color,
      headerTitle: headerTitle(route.params),
    }),
  };
};
