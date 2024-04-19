import { StyleSheet } from 'react-native';

import {
  colors,
  radius,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const authCardStyles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.foreground,
    padding: spacings.md,
    gap: spacings.sm,
    borderRadius: radius.sm,
  },
});
