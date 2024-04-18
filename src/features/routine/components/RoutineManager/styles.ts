import { StyleSheet } from 'react-native';

import { colors, spacings } from '../../../../shared/styles/globalStyles';

export const RoutineManagerStyles = StyleSheet.create({
  container: {
    paddingTop: spacings.md,
    paddingBottom: spacings.md,
    backgroundColor: colors.foreground,
    gap: spacings.md,
    borderRadius: spacings.xs,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
