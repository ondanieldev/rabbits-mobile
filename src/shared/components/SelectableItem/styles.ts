import { StyleSheet } from 'react-native';

import { colors, radius, sizes } from '../../styles/globalStyles';

export const clickableItemStyles = StyleSheet.create({
  touchable: {
    backgroundColor: colors.foreground,
    borderRadius: radius.sm,
    flex: 1,
    height: sizes.lg,
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: colors.primary,
    opacity: 0.1,
    width: '100%',
    height: '100%',
  },
});
