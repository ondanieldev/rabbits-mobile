import { StyleSheet } from 'react-native';

import { colors, fontSizes, radius, spacings } from '../../styles/globalStyles';

export const baseTextInputStyles = StyleSheet.create({
  container: {
    gap: spacings.xs,
  },
  inputContainer: {
    position: 'relative',
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
  secureIconButton: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
