import { StyleSheet } from 'react-native';

import {
  colors,
  fontSizes,
  sizes,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const itemCreatableTypeSelectorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacings.sm,
  },
  buttonTouchable: {
    flex: 1,
  },
  buttonView: {
    height: sizes.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fontSizes.md,
    color: colors.selectable,
    textTransform: 'capitalize',
  },
  selectedText: {
    color: colors.primary,
  },
});
