import { StyleSheet } from 'react-native';

import { colors } from '../../styles/globalStyles';

export const overlayStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: colors.primary,
    height: '100%',
    width: '100%',
    opacity: 0.1,
  },
});
