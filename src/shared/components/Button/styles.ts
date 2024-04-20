import { StyleSheet } from 'react-native';

import { colors, fontSizes, radius, sizes } from '../../styles/globalStyles';

export const buttonStyles = StyleSheet.create({
  touchable: {
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    height: sizes.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.background,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  touchableDisabled: {
    opacity: 0.5,
  },
});
