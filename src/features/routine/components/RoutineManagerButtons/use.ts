import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { AuthTokenStorage } from '../../../auth/storages/AuthTokenStorage';
import { signOut } from '../../../auth/stores/authStore';

export const useRoutineManagerButtons = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const dispatch = useDispatch();
  const signOutStatus = useSelector(state => state.auth.signOutStatus);

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(signOut()).unwrap();
      AuthTokenStorage.delete();
    } catch {
      //
    }
  }, [dispatch]);

  const handleAdd = useCallback(() => {
    navigation.navigate('RoutineUpsertScreen', {});
  }, [navigation]);

  const handleEdit = useCallback(() => {
    navigation.navigate('RoutineEditScreen', {});
  }, [navigation]);

  return {
    signOutStatus,
    handleSignOut,
    handleAdd,
    handleEdit,
  };
};
