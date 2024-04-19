import { StyleSheet } from 'react-native';

import { colors, fontSizes, spacings } from '../../styles/globalStyles';

export const dayOfWeekInputStyles = StyleSheet.create({
  container: {
    gap: spacings.xs,
  },
  label: {
    fontSize: fontSizes.md,
    color: colors.primaryText,
  },
  listContainer: {
    flexDirection: 'row',
    gap: spacings.sm,
  },
});
