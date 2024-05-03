import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { ResetPasswordValidateTokenFormProps } from '.';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import { toastErrorResetPasswordValidateToken } from '../../../toast/data/toastTemplates';
import {
  ResetPasswordValidateTokenSchema,
  resetPasswordValidateTokenSchema,
} from '../../schemas/resetPasswordSchema';
import { ResetPasswordService } from '../../services/ResetPasswordService';

export const useResetPasswordValidateTokenForm = ({
  email,
}: ResetPasswordValidateTokenFormProps) => {
  // Toast setup
  const { toastify } = useToast();

  // Navigation setup
  const navigation = useNavigation<StackNavigationProp>();

  // Form setup
  const form = useForm<ResetPasswordValidateTokenSchema>({
    resolver: zodResolver(resetPasswordValidateTokenSchema),
    defaultValues: {
      token: '',
    },
    mode: 'onSubmit',
  });

  // Loading setup
  const [isLoading, setIsLoading] = useState(false);

  // Request token
  const onSubmit = useCallback(
    async ({ token }: ResetPasswordValidateTokenSchema) => {
      setIsLoading(true);
      try {
        await ResetPasswordService.validateToken({
          email,
          token,
        });
        navigation.navigate('ResetPasswordScreen', { email, token });
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorResetPasswordValidateToken(message));
      }
      setIsLoading(false);
    },
    [navigation, toastify, email],
  );

  // Return
  return {
    form,
    isLoading,
    onSubmit,
  };
};
