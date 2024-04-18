import { StyleSheet } from 'react-native';

import { colors, radius, spacings } from '../../styles/globalStyles';

export const selectableButtonStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    borderColor: colors.selectable,
    borderWidth: 1,
    borderRadius: radius.sm,
    padding: spacings.xs,
  },
  selected: {
    borderColor: colors.primary,
    color: colors.primary,
  },
});
