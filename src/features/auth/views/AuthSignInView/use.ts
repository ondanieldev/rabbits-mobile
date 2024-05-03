import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../../../shared/navigation/stack';

export const useAuthSignInView = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const hanldeSignUp = useCallback(() => {
    navigation.navigate('AuthSignUpScreen', {});
  }, [navigation]);

  const hanldeResetPassword = useCallback(() => {
    navigation.navigate('ResetPasswordGenerateTokenScreen', {});
  }, [navigation]);

  return {
    hanldeSignUp,
    hanldeResetPassword,
  };
};
