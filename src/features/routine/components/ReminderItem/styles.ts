import { StyleSheet } from 'react-native';

import { colors, radius, sizes } from '../../../../shared/styles/globalStyles';

export const reminderItemStyles = StyleSheet.create({
  container: {
    height: sizes.lg,
    backgroundColor: colors.foreground,
    flex: 1,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
