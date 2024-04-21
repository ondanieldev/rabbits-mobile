import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { CircleIconButton } from '../../../../shared/components/CircleIconButton';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { useAuth } from '../../../auth/hooks/useAuth';
import { routineManagerButtonsStyles } from './style';

export const RoutineManagerButtons: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const { signOut, isLoadingSignOut } = useAuth();

  return (
    <View style={routineManagerButtonsStyles.container}>
      <CircleIconButton
        iconProps={{
          name: 'plus',
          size: 25,
        }}
        buttonProps={{
          onPress: () => navigation.navigate('RoutineUpsertScreen', {}),
        }}
      />
      <CircleIconButton
        iconProps={{
          name: 'edit-2',
          size: 20,
        }}
        buttonProps={{
          onPress: () => navigation.navigate('RoutineEditScreen', {}),
        }}
      />
      <CircleIconButton
        iconProps={{
          name: 'log-out',
          size: 20,
        }}
        buttonProps={{
          onPress: () => signOut({}),
          isLoading: isLoadingSignOut,
        }}
      />
    </View>
  );
};
