import { StyleSheet } from 'react-native';

import { colors } from '../../../../shared/styles/globalStyles';

export const verifyEmailFormStyles = StyleSheet.create({
  resendButton: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  resendButtonText: {
    color: colors.primary,
  },
  text: {
    textAlign: 'center',
  },
});
