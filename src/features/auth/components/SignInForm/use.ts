import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignInFormProps } from '.';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import {
  toastErrorSignIn,
  toastSuccessSignIn,
} from '../../../toast/data/toastTemplates';
import { SignInSchema, signInSchema } from '../../schemas/signInSchema';
import { AuthTokenStorage } from '../../storages/AuthTokenStorage';
import { signIn } from '../../stores/authStore';

export const useSignInForm = ({ email }: SignInFormProps) => {
  /**
   * Toast setup
   */
  const { toastify } = useToast();

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Form setup
   */
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: email || '',
      password: '',
    },
    mode: 'onSubmit',
  });

  /**
   * Sign in
   */
  const signInStatus = useSelector(state => state.auth.signInStatus);

  const onSubmit = useCallback(
    async (data: SignInSchema) => {
      try {
        const response = await dispatch(signIn(data)).unwrap();
        AuthTokenStorage.set(response);
        toastify(toastSuccessSignIn);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorSignIn(message));
      }
    },
    [dispatch, toastify],
  );

  /**
   * Fill form with default email
   */
  useEffect(() => {
    if (email) {
      form.setValue('email', email);
    }
  }, [email, form]);

  /**
   * Return
   */
  return {
    form,
    signInStatus,
    onSubmit,
  };
};
