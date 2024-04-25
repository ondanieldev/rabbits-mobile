import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StackRouteConfig } from '../../../../shared/navigation/stack';
import { appStyles } from '../../../../shared/styles/appStyles';
import { RoutineEditView } from '../../views/RoutineEditView';

export type RoutineEditScreenHook = () => StackRouteConfig<'RoutineEditScreen'>;

export const useRoutineEditScreen: RoutineEditScreenHook = () => {
  const { t } = useTranslation('routine');

  const title = useMemo(() => t('routineEditScreenTitle'), [t]);

  return {
    name: 'RoutineEditScreen',
    component: RoutineEditView,
    options: {
      title,
      headerStyle: appStyles.header,
      headerTintColor: appStyles.header.color,
    },
  };
};
