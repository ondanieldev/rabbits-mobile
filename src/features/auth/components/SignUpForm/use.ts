import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useNotification } from '../../../notification/contexts/notificationContext';
import {
  notificationErrorSignUp,
  notificationSuccessSignUp,
} from '../../../notification/data/notificationTemplates';
import { SignUpSchema, signUpSchema } from '../../schemas/signUpSchema';
import { signUp } from '../../stores/authStore';

export const useSignUpForm = () => {
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
   * Form setup
   */
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  /**
   * Sign up
   */
  const signUpStatus = useSelector(state => state.auth.signUpStatus);

  const onSubmit = useCallback(
    async ({ confirmPassword: _, ...data }: SignUpSchema) => {
      try {
        await dispatch(signUp(data)).unwrap();
        navigation.navigate('AuthSignInScreen', {});
        notify(notificationSuccessSignUp);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        notify(notificationErrorSignUp(message));
      }
    },
    [dispatch, navigation, notify],
  );

  /**
   * Return
   */
  return {
    form,
    signUpStatus,
    onSubmit,
  };
};
