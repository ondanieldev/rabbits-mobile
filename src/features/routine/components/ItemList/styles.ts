import { StyleSheet } from 'react-native';

import { spacings } from '../../../../shared/styles/globalStyles';

export const itemListStyles = StyleSheet.create({
  container: {
    gap: spacings.xs2,
  },
  defaultItem: {},
  firstItem: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  middleItem: {
    borderRadius: 0,
  },
  lastItem: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
});
