import { SwitchProps } from 'react-native';

import { colors } from '../../styles/globalStyles';

export const switchBaseProps: SwitchProps = {
  trackColor: {
    false: colors.selectable,
    true: colors.primary,
  },
  ios_backgroundColor: colors.selectable,
};
