import { StyleSheet } from 'react-native';

import {
  colors,
  radius,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const toastStyles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    padding: spacings.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.foreground,
    opacity: 0.95,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
