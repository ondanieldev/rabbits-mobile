import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { updateProfile } from '../../../profile/stores/profileStore';
import { useToast } from '../../../toast/contexts/toastContext';
import { toastErrorUpdateEmail } from '../../../toast/data/toastTemplates';
import { useGenerateVerifyEmailToken } from '../../hooks/useGenerateVerifyEmailToken';
import {
  UpdateEmailSchema,
  updateEmailSchema,
} from '../../schemas/updateEmailSchema';
import { VerifyEmailService } from '../../services/VerifyEmailService';

export const useUpdateEmailForm = () => {
  // Use common hook to generate token
  const { handleGenerateToken } = useGenerateVerifyEmailToken();

  // Redux setup
  const dispatch = useDispatch();

  // Navigation setup
  const navigation = useNavigation<StackNavigationProp>();

  // Toast setup
  const { toastify } = useToast();

  // Form setup
  const form = useForm<UpdateEmailSchema>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
  });

  // Loading setup
  const [isLoading, setIsLoading] = useState(false);

  // Update email
  const onSubmit = useCallback(
    async (data: UpdateEmailSchema) => {
      setIsLoading(true);
      try {
        const user = await VerifyEmailService.updateEmail(data);
        dispatch(updateProfile(user));
        navigation.navigate('VerifyEmailScreen', {});
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorUpdateEmail(message));
      }
      setIsLoading(false);
      handleGenerateToken();
    },
    [dispatch, toastify, navigation, handleGenerateToken],
  );

  // Return
  return {
    form,
    onSubmit,
    isLoading,
  };
};
