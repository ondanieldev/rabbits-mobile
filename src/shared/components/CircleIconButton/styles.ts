import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../styles/globalStyles';

export const circleIconButtonStyles = StyleSheet.create({
  touchable: {
    backgroundColor: colors.primary,
    height: sizes.sm,
    width: sizes.sm,
    borderRadius: sizes.sm / 2,
  },
});
