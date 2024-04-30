import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { AuthTokenStorage } from '../../../auth/storages/AuthTokenStorage';
import { signOut } from '../../../auth/stores/authStore';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useNotification } from '../../../notification/contexts/notificationContext';
import { notificationErrorSignOut } from '../../../notification/data/notificationTemplates';

export const useRoutineManagerButtons = () => {
  /**
   * Notification setup
   */
  const { notify } = useNotification();

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
   * Sign out
   */
  const signOutStatus = useSelector(state => state.auth.signOutStatus);

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(signOut()).unwrap();
      AuthTokenStorage.delete();
    } catch (err) {
      const message = ErrorHandler.handle(err);
      notify(notificationErrorSignOut(message));
    }
  }, [dispatch, notify]);

  return {
    handleAdd,
    handleEdit,
    handleSignOut,
    signOutStatus,
  };
};
