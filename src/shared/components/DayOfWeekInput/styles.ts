import { StyleSheet } from 'react-native';

import { spacings } from '../../styles/globalStyles';

export const dayOfWeekInputStyles = StyleSheet.create({
  container: {
    gap: spacings.xs,
  },
  listContainer: {
    flexDirection: 'row',
    gap: spacings.sm,
  },
});
