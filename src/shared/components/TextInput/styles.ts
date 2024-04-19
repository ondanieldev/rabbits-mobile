import { StyleSheet } from 'react-native';

import { colors, fontSizes, radius, spacings } from '../../styles/globalStyles';

export const textInputStyles = StyleSheet.create({
  container: {
    gap: spacings.xs,
  },
  label: {
    fontSize: fontSizes.md,
    color: colors.primaryText,
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.selectable,
    borderRadius: radius.sm,
    fontSize: fontSizes.md,
    color: colors.primaryText,
    padding: spacings.sm,
  },
  inputSelected: {
    borderColor: colors.primary,
  },
  error: {
    color: colors.danger,
  },
});
