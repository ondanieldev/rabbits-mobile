import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { SignInSchema, signInSchema } from '../../schemas/signInSchema';
import { AuthTokenStorage } from '../../storages/AuthTokenStorage';
import { signIn } from '../../stores/authStore';

export const useSignInForm = () => {
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
      email: '',
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
      } catch {
        //
      }
    },
    [dispatch],
  );

  /**
   * Return
   */
  return {
    form,
    signInStatus,
    onSubmit,
  };
};
