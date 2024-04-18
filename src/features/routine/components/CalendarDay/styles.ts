import { StyleSheet } from 'react-native';

import {
  colors,
  fontSizes,
  sizes,
} from '../../../../shared/styles/globalStyles';

export const calendarDayStyles = StyleSheet.create({
  container: {
    height: sizes.md,
    width: sizes.md,
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
  textSelected: {
    color: colors.primary,
  },
});
