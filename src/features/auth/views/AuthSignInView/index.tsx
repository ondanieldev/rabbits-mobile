import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { AuthCard } from '../../components/AuthCard';
import { AuthCTALink } from '../../components/AuthCTALink';
import { AuthTitle } from '../../components/AuthTitle';
import { AuthView } from '../../components/AuthView';
import { SignInForm } from '../../components/SignInForm';
import { useAuthSignInView } from './use';
import { useAuthSignInViewTranslation } from './useTranslation';

export interface AuthSignInViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'AuthSignInScreen'
  > {}

export const AuthSignInView: React.FC<AuthSignInViewProps> = () => {
  const {
    resetPasswordCtaBase,
    resetPasswordCtaHighlight,
    sigUpCtaHighlight,
    signUpCtaBase,
    titleBase,
    titleHighlight,
  } = useAuthSignInViewTranslation();

  const { hanldeResetPassword, hanldeSignUp } = useAuthSignInView();

  return (
    <AuthView>
      <AuthCard>
        <AuthTitle base={titleBase} highlight={titleHighlight} />

        <SignInForm />
      </AuthCard>

      <AuthCTALink
        base={signUpCtaBase}
        highlight={sigUpCtaHighlight}
        onPress={hanldeSignUp}
      />

      <AuthCTALink
        base={resetPasswordCtaBase}
        highlight={resetPasswordCtaHighlight}
        onPress={hanldeResetPassword}
      />
    </AuthView>
  );
};
