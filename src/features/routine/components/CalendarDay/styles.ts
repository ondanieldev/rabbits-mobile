import { StyleSheet } from 'react-native';

import {
  colors,
  fontSizes,
  radius,
  sizes,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const calendarDayStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderColor: colors.selectable,
    borderWidth: 1,
    borderRadius: radius.sm,
    height: sizes.md,
    width: sizes.md,
    padding: spacings.xs,
  },
  dayOfWeek: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.selectable,
    fontSize: fontSizes.xs,
  },
  day: {
    textAlign: 'center',
    color: colors.selectable,
    fontSize: fontSizes.sm,
  },
  containerSelected: {
    borderColor: colors.primary,
  },
  textSelected: {
    color: colors.primary,
  },
});
