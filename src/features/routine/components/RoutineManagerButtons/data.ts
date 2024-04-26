import { IconButtonProps } from '../../../../shared/components/IconButton';
import { iconSizes } from '../../../../shared/styles/globalStyles';

export const routineManagerButtonsIconProps: Record<
  'add' | 'edit' | 'signOut',
  IconButtonProps['iconProps']
> = {
  add: {
    name: 'plus',
    size: iconSizes.md,
  },
  edit: {
    name: 'edit-2',
    size: iconSizes.sm,
  },
  signOut: {
    name: 'log-out',
    size: iconSizes.sm,
  },
};
