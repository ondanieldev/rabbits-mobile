import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { SignUpSchema, signUpSchema } from '../../schemas/signUpSchema';
import { signUp } from '../../stores/authStore';

export const useSignUpForm = () => {
  const { t } = useTranslation('auth');
  const emailLabel = useMemo(() => t('email'), [t]);
  const passwordLabel = useMemo(() => t('password'), [t]);
  const confirmPasswordLabel = useMemo(() => t('confirmPassword'), [t]);
  const buttonText = useMemo(() => t('signUp'), [t]);

  const dispatch = useDispatch();
  const signUpStatus = useSelector(state => state.auth.signUpStatus);

  const navigation = useNavigation<StackNavigationProp>();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = useCallback(
    async ({ confirmPassword: _, ...data }: SignUpSchema) => {
      try {
        await dispatch(signUp(data)).unwrap();
        navigation.navigate('AuthSignInScreen', {});
      } catch {
        //
      }
    },
    [dispatch, navigation],
  );

  return {
    emailLabel,
    passwordLabel,
    confirmPasswordLabel,
    buttonText,
    form,
    signUpStatus,
    onSubmit,
  };
};
