import { TouchableHighlight, View } from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { colors } from '../../styles/globalStyles';
import { useCircleCheckBox } from './use';

export interface CircleCheckBoxProps {
  onToggle?: (isChecked: boolean) => void;
  isChecked?: boolean;
}

export const CircleCheckBox: React.FC<CircleCheckBoxProps> = props => {
  const { styles } = useCircleCheckBox(props);

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => props.onToggle?.(!props.isChecked)}>
      {props.isChecked ? (
        <FeIcon name="check" color={colors.background} size={25} />
      ) : (
        <View />
      )}
    </TouchableHighlight>
  );
};
