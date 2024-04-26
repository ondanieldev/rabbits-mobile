import { StyleSheet } from 'react-native';

import { spacings } from '../../../../shared/styles/globalStyles';

export const calendarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacings.sm,
  },
});
