import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { ResetPasswordGenerateTokenFormProps } from '.';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import { toastErrorResetPasswordGenerateToken } from '../../../toast/data/toastTemplates';
import { ResetPasswordGenerateToken } from '../../interfaces/ResetPassword';
import {
  ResetPasswordGenerateTokenSchema,
  resetPasswordGenerateTokenSchema,
} from '../../schemas/resetPasswordSchema';
import { ResetPasswordService } from '../../services/ResetPasswordService';

export const useResetPasswordGenerateTokenForm = (
  props: ResetPasswordGenerateTokenFormProps,
) => {
  // Toast setup
  const { toastify } = useToast();

  // Navigation setup
  const navigation = useNavigation<StackNavigationProp>();

  // Form setup
  const form = useForm<ResetPasswordGenerateTokenSchema>({
    resolver: zodResolver(resetPasswordGenerateTokenSchema),
    defaultValues: {
      email: props.email || '',
    },
    mode: 'onSubmit',
  });

  // Loading setup
  const [isLoading, setIsLoading] = useState(false);

  // Request token
  const onSubmit = useCallback(
    async (data: ResetPasswordGenerateToken) => {
      setIsLoading(true);
      try {
        await ResetPasswordService.generateToken(data);
        navigation.navigate('ResetPasswordValidateTokenScreen', {
          email: data.email,
        });
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorResetPasswordGenerateToken(message));
      }
      setIsLoading(false);
    },
    [navigation, toastify],
  );

  // Return
  return {
    form,
    isLoading,
    onSubmit,
  };
};
