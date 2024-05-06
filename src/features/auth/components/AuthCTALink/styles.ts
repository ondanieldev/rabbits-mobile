import { StyleSheet } from 'react-native';

import { colors, spacings } from '../../../../shared/styles/globalStyles';

export const authCTALinkStyles = StyleSheet.create({
  container: {
    gap: spacings.xs,
    alignItems: 'center',
  },
  base: {
    textAlign: 'center',
  },
  highlight: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
