import { IconButtonProps } from '../../../../shared/components/IconButton';
import { colors, iconSizes } from '../../../../shared/styles/globalStyles';

export const reminderListIconProps: Record<
  'prev' | 'next',
  IconButtonProps['iconProps']
> = {
  prev: {
    name: 'chevron-left',
    size: iconSizes.lg,
    color: colors.primaryText,
  },
  next: {
    name: 'chevron-right',
    size: iconSizes.lg,
    color: colors.primaryText,
  },
};
