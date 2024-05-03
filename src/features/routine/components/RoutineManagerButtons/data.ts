import { IconButtonProps } from '../../../../shared/components/IconButton';
import { iconSizes } from '../../../../shared/styles/globalStyles';

export const routineManagerButtonsIconProps: Record<
  'add' | 'edit' | 'preferences' | 'signOut' | 'debug',
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
  preferences: {
    name: 'user',
    size: iconSizes.sm,
  },
  signOut: {
    name: 'log-out',
    size: iconSizes.sm,
  },
  debug: {
    name: 'code',
    size: iconSizes.sm,
  },
};
