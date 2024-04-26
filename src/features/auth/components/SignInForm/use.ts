import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { SignInSchema, signInSchema } from '../../schemas/signInSchema';
import { AuthTokenStorage } from '../../storages/AuthTokenStorage';
import { signIn } from '../../stores/authStore';

export const useSignInForm = () => {
  const dispatch = useDispatch();
  const signInStatus = useSelector(state => state.auth.signInStatus);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

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

  return {
    form,
    signInStatus,
    onSubmit,
  };
};
