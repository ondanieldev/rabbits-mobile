import {
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { colors } from '../../styles/globalStyles';

export interface IconButtonProps {
  buttonProps?: TouchableHighlightProps;
  iconProps: {
    name: string;
    size?: number;
    color?: string;
  };
}

export const IconButton: React.FC<IconButtonProps> = ({
  buttonProps,
  iconProps: { name, size, color = colors.selectable },
}) => {
  return (
    <TouchableHighlight {...buttonProps}>
      <View>
        <FeIcon
          name={name}
          size={size}
          color={buttonProps?.disabled ? colors.disabled : color}
        />
      </View>
    </TouchableHighlight>
  );
};
