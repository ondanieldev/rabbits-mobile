import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../../../shared/navigation/stack';

export const useUpdateEmailView = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const ctaOnPress = useCallback(() => {
    navigation.navigate('VerifyEmailScreen', {});
  }, [navigation]);

  return {
    ctaOnPress,
  };
};
