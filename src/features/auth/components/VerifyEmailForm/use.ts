import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { updateProfile } from '../../../profile/stores/profileStore';
import { useToast } from '../../../toast/contexts/toastContext';
import {
  toastErrorVerifyEmail,
  toastErrorVerifyEmailGenerateToken,
  toastSuccessVerifyEmail,
} from '../../../toast/data/toastTemplates';
import {
  VerifyEmailSchema,
  verifyEmailSchema,
} from '../../schemas/verifyEmailSchema';
import { VerifyEmailService } from '../../services/VerifyEmailService';

export const useVerifyEmailForm = () => {
  // Redux setup
  const dispatch = useDispatch();

  // Toast setup
  const { toastify } = useToast();

  // Form setup
  const form = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: '',
    },
    mode: 'onSubmit',
  });

  // Loading setup
  const [isLoadingGenerateToken, setIsLoadingGenerateToken] = useState(false);
  const [isLoadingVerifyEmail, setIsLoadingVerifyEmail] = useState(false);

  // Request token
  const handleGenerateToken = useCallback(async () => {
    setIsLoadingGenerateToken(true);
    try {
      await VerifyEmailService.generateToken();
    } catch (err) {
      const message = ErrorHandler.handle(err);
      toastify(toastErrorVerifyEmailGenerateToken(message));
    }
    setIsLoadingGenerateToken(false);
  }, [toastify]);

  // Verify email
  const onSubmit = useCallback(
    async (data: VerifyEmailSchema) => {
      setIsLoadingVerifyEmail(true);
      try {
        await VerifyEmailService.verifyEmail(data);
        dispatch(updateProfile({ isEmailVerified: true }));
        toastify(toastSuccessVerifyEmail);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorVerifyEmail(message));
      }
      setIsLoadingVerifyEmail(false);
    },
    [dispatch, toastify],
  );

  // Request token on load
  useEffect(() => {
    handleGenerateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This effect should only run once
  }, []);

  // Return
  return {
    form,
    onSubmit,
    isLoadingGenerateToken,
    isLoadingVerifyEmail,
    handleGenerateToken,
  };
};
