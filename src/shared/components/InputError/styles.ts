import { StyleSheet } from 'react-native';

import { colors, fontSizes } from '../../styles/globalStyles';

export const inputErrorStyles = StyleSheet.create({
  message: {
    fontSize: fontSizes.sm,
    color: colors.danger,
  },
});
