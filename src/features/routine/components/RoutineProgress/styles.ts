import { StyleSheet } from 'react-native';

import {
  colors,
  fontSizes,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const routineProgressStyles = StyleSheet.create({
  container: {
    padding: spacings.sm,
    backgroundColor: colors.background,
    gap: spacings.sm,
  },
  text: {
    fontSize: fontSizes.sm,
    color: colors.primaryText,
  },
});
