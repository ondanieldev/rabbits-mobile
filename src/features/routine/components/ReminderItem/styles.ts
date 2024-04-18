import { StyleSheet } from 'react-native';

import { colors, fontSizes } from '../../../../shared/styles/globalStyles';

export const reminderItemStyles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
  },
  name: {
    color: colors.primaryText,
    fontSize: fontSizes.md,
  },
});
