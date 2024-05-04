import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../../../shared/navigation/stack';

export const useVerifyEmailView = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const ctaOnPress = useCallback(() => {
    navigation.navigate('UpdateEmailScreen', {});
  }, [navigation]);

  return {
    ctaOnPress,
  };
};
