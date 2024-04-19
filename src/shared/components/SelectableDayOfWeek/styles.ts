import { StyleSheet } from 'react-native';

import { colors, fontSizes, sizes } from '../../styles/globalStyles';

export const selectableDayOfWeekStyles = StyleSheet.create({
  touchable: {
    height: sizes.sm,
    width: sizes.sm,
    borderRadius: sizes.sm / 2,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.selectable,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: fontSizes.sm,
    color: colors.selectable,
  },
  labelSelected: {
    color: colors.background,
  },
});
