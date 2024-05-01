import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StackRouteConfig } from '../../../../shared/navigation/stack';
import { appStyles } from '../../../../shared/styles/appStyles';
import { PreferenceView } from '../../views/PreferenceView';

export type PreferenceScreen = () => StackRouteConfig<'PreferenceScreen'>;

export const usePreferenceScreen: PreferenceScreen = () => {
  const { t } = useTranslation('profile');

  const title = useMemo(() => t('preferenceScreenTitle'), [t]);

  return {
    name: 'PreferenceScreen',
    component: PreferenceView,
    options: {
      title,
      headerStyle: appStyles.header,
      headerTintColor: appStyles.header.color,
    },
  };
};
