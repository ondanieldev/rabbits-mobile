import { StyleSheet } from 'react-native';

import { spacings } from '../../../../shared/styles/globalStyles';

export const reminderListStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacings.sm,
  },
  itemContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    height: '100%',
  },
  itemTextContainer: {
    padding: 0,
    justifyContent: 'center',
  },
});
