import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../styles/globalStyles';

export const circleCheckBoxStyles = StyleSheet.create({
  container: {
    height: sizes.sm,
    width: sizes.sm,
    borderRadius: sizes.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.selectable,
  },
  containerChecked: {
    backgroundColor: colors.primary,
  },
  containerLoading: {
    opacity: 0.5,
  },
});
