import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../../../shared/navigation/stack';

export type AuthSignInViewHook = () => {
  titleBase: string;
  titleHighlight: string;
  ctaBase: string;
  ctaHighlight: string;
  ctaOnPress: () => void;
};

export const useAuthSignInView = () => {
  const { t } = useTranslation('auth');
  const navigation = useNavigation<StackNavigationProp>();

  const titleBase = useMemo(() => t('signInTo'), [t]);
  const titleHighlight = useMemo(() => t('habits'), [t]);

  const ctaBase = useMemo(() => t('signUpCTA'), [t]);
  const ctaHighlight = useMemo(() => t('signUpLink'), [t]);

  const ctaOnPress = useCallback(() => {
    navigation.navigate('AuthSignUpScreen', {});
  }, [navigation]);

  return {
    titleBase,
    titleHighlight,
    ctaBase,
    ctaHighlight,
    ctaOnPress,
  };
};
