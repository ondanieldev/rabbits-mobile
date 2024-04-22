import { StyleSheet } from 'react-native';

import { colors, spacings } from '../../styles/globalStyles';

export const defaultViewStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    gap: spacings.md,
    flex: 1,
  },
});
