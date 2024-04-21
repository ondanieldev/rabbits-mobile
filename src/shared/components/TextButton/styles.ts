import { StyleSheet } from 'react-native';

import { colors, fontSizes, radius, sizes } from '../../styles/globalStyles';

export const textButtonStyles = StyleSheet.create({
  touchable: {
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    height: sizes.md,
  },
  text: {
    color: colors.background,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
