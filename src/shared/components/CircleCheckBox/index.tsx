import { ActivityIndicator, TouchableHighlight, View } from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { colors, iconSizes } from '../../styles/globalStyles';
import { useCircleCheckBox } from './use';

export interface CircleCheckBoxProps {
  onToggle?: (isChecked: boolean) => void;
  isChecked?: boolean;
  isLoading?: boolean;
}

export const CircleCheckBox: React.FC<CircleCheckBoxProps> = props => {
  const { activityIndicatorColor, styles, onPress } = useCircleCheckBox(props);

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      disabled={props.isLoading}>
      <View>
        {props.isLoading && (
          <ActivityIndicator size="small" color={activityIndicatorColor} />
        )}

        {!props.isLoading && props.isChecked && (
          <FeIcon name="check" color={colors.background} size={iconSizes.md} />
        )}
      </View>
    </TouchableHighlight>
  );
};
