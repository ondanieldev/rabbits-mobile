import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../../../shared/navigation/stack';

export const useAuthSignInView = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const ctaOnPress = useCallback(() => {
    navigation.navigate('AuthSignUpScreen', {});
  }, [navigation]);

  return {
    ctaOnPress,
  };
};
