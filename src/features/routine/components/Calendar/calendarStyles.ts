import { StyleSheet } from 'react-native';

import {
  colors,
  fontSizes,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const calendarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacings.sm,
  },
  containerGoToToday: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGoToToday: {
    color: colors.background,
    fontSize: fontSizes.xs,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
