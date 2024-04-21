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
        AuthTokenStorage.delete();
        dispatch(setAuthToken(null));
      },
    },
  );

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
