import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { ResetPasswordFormProps } from '.';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import {
  toastErrorResetPassword,
  toastSuccessResetPassword,
} from '../../../toast/data/toastTemplates';
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from '../../schemas/resetPasswordSchema';
import { ResetPasswordService } from '../../services/ResetPasswordService';

export const useResetPasswordForm = ({
  email,
  token,
}: ResetPasswordFormProps) => {
  // Toast setup
  const { toastify } = useToast();

  // Navigation setup
  const navigation = useNavigation<StackNavigationProp>();

  // Form setup
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  // Loading setup
  const [isLoading, setIsLoading] = useState(false);

  // Request token
  const onSubmit = useCallback(
    async (data: ResetPasswordSchema) => {
      setIsLoading(true);
      try {
        await ResetPasswordService.resetPassword({
          email,
          token,
          ...data,
        });
        toastify(toastSuccessResetPassword);
        navigation.navigate('AuthSignInScreen', { email });
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorResetPassword(message));
      }
      setIsLoading(false);
    },
    [navigation, toastify, email, token],
  );

  // Return
  return {
    form,
    isLoading,
    onSubmit,
  };
};
