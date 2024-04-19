import { StyleSheet } from 'react-native';

import { colors, spacings } from '../../../../shared/styles/globalStyles';

export const authCTALinkStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacings.xs,
  },
  highlight: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
