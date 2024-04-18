import { StyleSheet } from 'react-native';

import {
  colors,
  fontSizes,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const itemStyles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacings.md,
    paddingLeft: spacings.md,
  },
  textContainer: {
    flex: 1,
    marginLeft: spacings.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: colors.primaryText,
    fontSize: fontSizes.md,
  },
  date: {
    color: colors.primaryText,
    fontSize: fontSizes.md,
  },
  appointmentText: {
    color: colors.primary,
  },
});
