import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ResetPasswordValidateTokenScreenParams } from '.';
import { StackNavigationProp } from '../../../../shared/navigation/stack';

export const useResetPasswordValidateTokenView = (
  params: ResetPasswordValidateTokenScreenParams,
) => {
  const navigation = useNavigation<StackNavigationProp>();

  const ctaOnPress = useCallback(() => {
    navigation.navigate('ResetPasswordGenerateTokenScreen', params);
  }, [navigation, params]);

  return {
    ctaOnPress,
  };
};
