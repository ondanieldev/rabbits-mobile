import { StyleSheet } from 'react-native';

import { IconButton, IconButtonProps } from '../IconButton';
import { circleIconButtonStyles } from './styles';

export const CircleIconButton: React.FC<IconButtonProps> = ({
  iconProps,
  buttonProps: { style: buttonStyle, ...buttonProps } = {},
}) => {
  return (
    <IconButton
      iconProps={iconProps}
      buttonProps={{
        style: StyleSheet.compose(
          circleIconButtonStyles.touchable,
          buttonStyle,
        ),
        ...buttonProps,
      }}
    />
  );
};
