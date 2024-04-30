import { StyleSheet } from 'react-native';

import { spacings } from '../../../../shared/styles/globalStyles';

export const toastContainerStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: spacings.md * 6,
    right: 0,
    zIndex: 1000,
    padding: spacings.md,
    width: '100%',
  },
  contentContainer: {
    width: '100%',
    position: 'relative',
  },
});
