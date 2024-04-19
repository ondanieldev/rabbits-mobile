import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { AuthCard } from '../../components/AuthCard';
import { AuthCTALink } from '../../components/AuthCTALink';
import { AuthTitle } from '../../components/AuthTitle';
import { AuthView } from '../../components/AuthView';
import { SignInForm } from '../../components/SignInForm';
import { useAuthSignInView } from './use';

export interface SignInViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'AuthSignInScreen'
  > {}

export const AuthSignInView: React.FC = () => {
  const { titleBase, titleHighlight, ctaBase, ctaHighlight, ctaOnPress } =
    useAuthSignInView();

  return (
    <AuthView>
      <AuthCard>
        <AuthTitle base={titleBase} highlight={titleHighlight} />

        <SignInForm />
      </AuthCard>

      <AuthCTALink
        base={ctaBase}
        highlight={ctaHighlight}
        onPress={ctaOnPress}
      />
    </AuthView>
  );
};
