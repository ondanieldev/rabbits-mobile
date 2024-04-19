import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../styles/globalStyles';

export const circleIconButtonStyles = StyleSheet.create({
  icon: {
    color: colors.background,
  },
  touchable: {
    backgroundColor: colors.primary,
    height: sizes.sm,
    width: sizes.sm,
    borderRadius: sizes.sm / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
