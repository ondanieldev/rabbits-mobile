import {
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import { IconProps } from 'react-native-vector-icons/Icon';

import { colors } from '../../styles/globalStyles';

export interface IconButtonProps {
  buttonProps?: TouchableHighlightProps;
  iconProps: IconProps & {
    name: string;
    size?: number;
    color?: string;
  };
}

export const IconButton: React.FC<IconButtonProps> = ({
  buttonProps,
  iconProps: { name, size = 25, color = colors.selectable, ...iconProps },
}) => {
  return (
    <TouchableHighlight {...buttonProps}>
      <View>
        <FeIcon
          name={name}
          size={size}
          color={buttonProps?.disabled ? colors.disabled : color}
          {...iconProps}
        />
      </View>
    </TouchableHighlight>
  );
};
