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
  return (
    <Button {...buttonProps}>
      <FeIcon
        name={name}
        size={size}
        color={buttonProps?.disabled ? disabledColor : color}
        {...iconProps}
      />
    </Button>
  );
};
