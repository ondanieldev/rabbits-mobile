import { TouchableHighlight } from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { circleIconButtonStyles } from './styles';

interface CircleIconButtonProps {
  iconName: string;
  iconSize: number;
  onPress?: () => void;
}

export const CircleIconButton: React.FC<CircleIconButtonProps> = ({
  iconName,
  iconSize,
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={circleIconButtonStyles.touchable}
      onPress={onPress}>
      <FeIcon
        name={iconName}
        style={circleIconButtonStyles.icon}
        size={iconSize}
      />
    </TouchableHighlight>
  );
};
