import { StyleSheet } from 'react-native';

import {
  colors,
  fontSizes,
  radius,
  sizes,
  spacings,
} from '../../../../shared/styles/globalStyles';

export const itemStyles = StyleSheet.create({
  touchable: {
    position: 'relative',
    height: sizes.lg,
    backgroundColor: colors.foreground,
    overflow: 'hidden',
    borderRadius: radius.sm,
  },
  contentContainer: {
    height: '100%',
    width: '100%',
    paddingRight: spacings.md,
    paddingLeft: spacings.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: spacings.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
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
