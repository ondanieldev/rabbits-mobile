import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../../../shared/navigation/stack';

export type AuthSignUpViewHook = () => {
  titleBase: string;
  titleHighlight: string;
  ctaBase: string;
  ctaHighlight: string;
  ctaOnPress: () => void;
};

export const useAuthSignUpView: AuthSignUpViewHook = () => {
  const { t } = useTranslation('auth');
  const navigation = useNavigation<StackNavigationProp>();

  const titleBase = useMemo(() => t('signUpTo'), [t]);
  const titleHighlight = useMemo(() => t('habits'), [t]);

  const ctaBase = useMemo(() => t('signInCTA'), [t]);
  const ctaHighlight = useMemo(() => t('signInLink'), [t]);

  const ctaOnPress = useCallback(() => {
    navigation.navigate('AuthSignInScreen', {});
  }, [navigation]);

  return {
    titleBase,
    titleHighlight,
    ctaBase,
    ctaHighlight,
    ctaOnPress,
  };
};
