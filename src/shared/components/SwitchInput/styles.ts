import { StyleSheet } from 'react-native';

import { spacings } from '../../styles/globalStyles';

export const switchStyles = StyleSheet.create({
  outterContainer: {
    flexDirection: 'row',
    gap: spacings.xs,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: spacings.xs,
  },
});
