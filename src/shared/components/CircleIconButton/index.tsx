import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { colors } from '../../styles/globalStyles';
import { circleIconButtonStyles } from './styles';

interface CircleIconButtonProps {
  iconName: string;
  iconSize: number;
  onPress?: () => void;
  isLoading?: boolean;
}

export const CircleIconButton: React.FC<CircleIconButtonProps> = ({
  iconName,
  iconSize,
  isLoading,
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={StyleSheet.compose(
        circleIconButtonStyles.touchable,
        isLoading && circleIconButtonStyles.touchableLoading,
      )}
      onPress={onPress}>
      <>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.background} animating />
        ) : (
          <FeIcon
            name={iconName}
            style={circleIconButtonStyles.icon}
            size={iconSize}
          />
        )}
      </>
    </TouchableHighlight>
  );
};
