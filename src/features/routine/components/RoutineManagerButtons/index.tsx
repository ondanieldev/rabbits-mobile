import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { CircleIconButton } from '../../../../shared/components/CircleIconButton';
import { useAsync } from '../../../../shared/hooks/useAsync';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { AuthService } from '../../../auth/services/AuthService';
import { AuthTokenStorage } from '../../../auth/storages/AuthTokenStorage';
import { setAuthToken } from '../../../auth/stores/authStore';
import { routineManagerButtonsStyles } from './style';

export const RoutineManagerButtons: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const dispatch = useDispatch();

  const { fetch: signOut, isLoading: isLoadingSignOut } = useAsync(
    AuthService.signOut,
    {
      onSuccess: () => {
        AuthTokenStorage.delete;
        dispatch(setAuthToken(null));
      },
    },
  );

  return (
    <View style={routineManagerButtonsStyles.container}>
      <CircleIconButton
        iconName="plus"
        iconSize={25}
        onPress={() => navigation.navigate('RoutineUpsertScreen', {})}
      />
      <CircleIconButton
        iconName="edit-2"
        iconSize={20}
        onPress={() => navigation.navigate('RoutineEditScreen', {})}
      />
      <CircleIconButton
        iconName="log-out"
        iconSize={20}
        onPress={() => signOut}
        isLoading={isLoadingSignOut}
      />
    </View>
  );
};
