import { IconButton, IconButtonProps } from '../IconButton';
import { useCircleIconButton } from './use';

export const CircleIconButton: React.FC<IconButtonProps> = ({
  iconProps,
  buttonProps: { style: buttonStyle, ...buttonProps } = {},
}) => {
  const { styles } = useCircleIconButton({ style: buttonStyle });

  return (
    <IconButton
      iconProps={iconProps}
      buttonProps={{
        style: styles.button,
        ...buttonProps,
      }}
    />
  );
};
