import { StyleSheet } from 'react-native';

import { colors, spacings } from '../../../../shared/styles/globalStyles';

export const calendarWeekStyles = StyleSheet.create({
  container: {
    gap: spacings.sm,
  },
  containerToday: {
    borderColor: colors.primaryText,
  },
  dayOfWeekToday: {
    color: colors.primaryText,
  },
  dayToday: {
    color: colors.primaryText,
  },
});
