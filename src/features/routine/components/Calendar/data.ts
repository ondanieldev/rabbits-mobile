import { IconProps } from 'react-native-vector-icons/Icon';

import { iconSizes } from '../../../../shared/styles/globalStyles';

export const calendarIconProps: Record<'prev' | 'next', IconProps> = {
  prev: {
    name: 'chevrons-left',
    size: iconSizes.lg,
  },
  next: {
    name: 'chevrons-right',
    size: iconSizes.lg,
  },
};
