import { StyleSheet } from 'react-native';

import {
  colors,
  radius,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const notificationStyles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    padding: spacings.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.foreground,
  },
  success: {
    backgroundColor: colors.success,
  },
  error: {
    backgroundColor: colors.error,
  },
  title: {
    fontWeight: 'bold',
  },
  message: {},
});
