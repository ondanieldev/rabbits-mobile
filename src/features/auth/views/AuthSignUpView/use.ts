import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../../../shared/navigation/stack';

export const useAuthSignUpView = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const ctaOnPress = useCallback(() => {
    navigation.navigate('AuthSignInScreen', {});
  }, [navigation]);

  return {
    ctaOnPress,
  };
};
