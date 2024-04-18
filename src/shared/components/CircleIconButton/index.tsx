import { GestureResponderEvent, TouchableHighlight, View } from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { circleIconButtonStyles } from './styles';

interface CircleIconButtonProps {
  iconName: string;
  iconSize: number;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export const CircleIconButton: React.FC<CircleIconButtonProps> = ({
  iconName,
  iconSize,
  onPress,
}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={circleIconButtonStyles.buttonContainer}>
        <FeIcon
          name={iconName}
          style={circleIconButtonStyles.icon}
          size={iconSize}
        />
      </View>
    </TouchableHighlight>
  );
};
