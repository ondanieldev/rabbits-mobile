import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { CircleIconButton } from '../../../../shared/components/CircleIconButton';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { routineManagerButtonsStyles } from './style';

export const RoutineManagerButtons: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  return (
    <View style={routineManagerButtonsStyles.container}>
      <CircleIconButton
        iconName="plus"
        iconSize={25}
        onPress={() => navigation.navigate('AddToRoutineScreen', {})}
      />
      <CircleIconButton
        iconName="edit-2"
        iconSize={20}
        onPress={() => navigation.navigate('AddToRoutineScreen', {})}
      />
      <CircleIconButton iconName="log-out" iconSize={20} onPress={() => {}} />
    </View>
  );
};
