import { StyleSheet } from 'react-native';

import {
  colors,
  fontSizes,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const authTitleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacings.xs,
  },
  base: {
    fontSize: fontSizes.lg,
    color: colors.primaryText,
  },
  highlight: {
    fontSize: fontSizes.lg,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
