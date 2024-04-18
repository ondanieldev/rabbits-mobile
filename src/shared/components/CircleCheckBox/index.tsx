import { TouchableHighlight, View } from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { colors } from '../../styles/globalStyles';
import { useCircleCheckBox } from './use';

export interface CircleCheckBoxProps {
  defaultChecked?: boolean;
}

export const CircleCheckBox: React.FC<CircleCheckBoxProps> = props => {
  const { handleToggle, isChecked, styles } = useCircleCheckBox(props);

  return (
    <TouchableHighlight onPress={handleToggle}>
      <View style={styles.container}>
        {isChecked && (
          <FeIcon name="check" color={colors.background} size={25} />
        )}
      </View>
    </TouchableHighlight>
  );
};
