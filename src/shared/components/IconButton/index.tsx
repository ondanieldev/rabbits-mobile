import { useMemo } from 'react';
import FeIcon from 'react-native-vector-icons/Feather';
import { IconProps } from 'react-native-vector-icons/Icon';

import { colors, fontSizes } from '../../styles/globalStyles';
import { Button, ButtonProps } from '../Button';

export interface IconButtonProps {
  buttonProps?: ButtonProps;
  iconProps: IconProps & {
    disabledColor?: string;
  };
}

export const IconButton: React.FC<IconButtonProps> = ({
  buttonProps,
  iconProps: {
    name,
    size = fontSizes.md,
    color = colors.selectable,
    disabledColor = colors.disabled,
    ...iconProps
  },
}) => {
  const iconColor = useMemo(
    () => (buttonProps?.disabled ? disabledColor : color),
    [buttonProps?.disabled, color, disabledColor],
  );

  return (
    <Button {...buttonProps}>
      <FeIcon name={name} size={size} color={iconColor} {...iconProps} />
    </Button>
  );
};
