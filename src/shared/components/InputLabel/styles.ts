import { StyleSheet } from 'react-native';

import { colors, fontSizes } from '../../styles/globalStyles';

export const inputLabelStyles = StyleSheet.create({
  label: {
    fontSize: fontSizes.md,
    color: colors.primaryText,
    textTransform: 'capitalize',
  },
});
