import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { AuthTokenStorage } from '../../../auth/storages/AuthTokenStorage';
import { setAuthToken, signOut } from '../../../auth/stores/authStore';
import { NotificationService } from '../../../notification/services/NotificationService';

export const useRoutineManagerButtons = () => {
  /**
   * Navigation setup
   */
  const navigation = useNavigation<StackNavigationProp>();

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Add
   */
  const handleAdd = useCallback(() => {
    navigation.navigate('RoutineUpsertScreen', {});
  }, [navigation]);

  /**
   * Edit
   */
  const handleEdit = useCallback(() => {
    navigation.navigate('RoutineEditScreen', {});
  }, [navigation]);

  /**
   * Preferences
   */
  const handlePreference = useCallback(() => {
    navigation.navigate('PreferenceScreen', {});
  }, [navigation]);

  /**
   * Debug
   */
  const handleDebug = useCallback(() => {
    navigation.navigate('DebugNotificationsScreen', {});
  }, [navigation]);

  /**
   * Sign out
   */
  const signOutStatus = useSelector(state => state.auth.signOutStatus);

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(signOut()).unwrap();
    } catch {
    } finally {
      dispatch(setAuthToken(null));
      AuthTokenStorage.delete();
      NotificationService.deleteAll();
    }
  }, [dispatch]);

  return {
    handleAdd,
    handleEdit,
    handleSignOut,
    signOutStatus,
    handlePreference,
    handleDebug,
  };
};
