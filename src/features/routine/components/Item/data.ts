import { TextProps } from 'react-native';

import { IconButtonProps } from '../../../../shared/components/IconButton';
import { colors } from '../../../../shared/styles/globalStyles';

export const itemTrashIconProps: IconButtonProps['iconProps'] = {
  name: 'trash',
  color: colors.danger,
  disabledColor: colors.selectable,
};

export const itemTextProps: TextProps = {
  numberOfLines: 1,
  ellipsizeMode: 'tail',
};
