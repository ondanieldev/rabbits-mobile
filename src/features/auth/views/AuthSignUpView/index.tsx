import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { AuthCard } from '../../components/AuthCard';
import { AuthCTALink } from '../../components/AuthCTALink';
import { AuthTitle } from '../../components/AuthTitle';
import { AuthView } from '../../components/AuthView';
import { SignUpForm } from '../../components/SignUpForm';
import { useAuthSignUpView } from './use';

export interface AuthSignUpViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'AuthSignUpScreen'
  > {}

export const AuthSignUpView: React.FC<AuthSignUpViewProps> = () => {
  const { titleBase, titleHighlight, ctaBase, ctaHighlight, ctaOnPress } =
    useAuthSignUpView();

  return (
    <AuthView>
      <AuthCard>
        <AuthTitle base={titleBase} highlight={titleHighlight} />

        <SignUpForm />
      </AuthCard>

      <AuthCTALink
        base={ctaBase}
        highlight={ctaHighlight}
        onPress={ctaOnPress}
      />
    </AuthView>
  );
};
