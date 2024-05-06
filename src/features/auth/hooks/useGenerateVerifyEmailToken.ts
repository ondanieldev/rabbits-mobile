import { useCallback } from 'react';

import { ErrorHandler } from '../../error/services/ErrorHandler';
import { useToast } from '../../toast/contexts/toastContext';
import { toastErrorVerifyEmailGenerateToken } from '../../toast/data/toastTemplates';
import { VerifyEmailService } from '../services/VerifyEmailService';

export const useGenerateVerifyEmailToken = () => {
  const { toastify } = useToast();

  const handleGenerateToken = useCallback(async () => {
    console.log('ola');
    try {
      await VerifyEmailService.generateToken();
    } catch (err) {
      const message = ErrorHandler.handle(err);
      toastify(toastErrorVerifyEmailGenerateToken(message));
    }
  }, [toastify]);

  return {
    handleGenerateToken,
  };
};
