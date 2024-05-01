import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { AuthTokenStorage } from '../../../auth/storages/AuthTokenStorage';
import { signOut } from '../../../auth/stores/authStore';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import { toastErrorSignOut } from '../../../toast/data/toastTemplates';

export const useRoutineManagerButtons = () => {
  /**
   * Toast setup
   */
  const { toastify } = useToast();

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
   * Sign out
   */
  const signOutStatus = useSelector(state => state.auth.signOutStatus);

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(signOut()).unwrap();
      AuthTokenStorage.delete();
    } catch (err) {
      const message = ErrorHandler.handle(err);
      toastify(toastErrorSignOut(message));
    }
  }, [dispatch, toastify]);

  return {
    handleAdd,
    handleEdit,
    handleSignOut,
    signOutStatus,
    handlePreference,
  };
};
