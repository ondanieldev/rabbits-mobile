import { StyleSheet } from 'react-native';

import { colors, spacings } from '../../styles/globalStyles';

export const defaultViewStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    minHeight: '100%',
    gap: spacings.md,
  },
});
