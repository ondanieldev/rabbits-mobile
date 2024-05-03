import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { AuthCard } from '../../components/AuthCard';
import { AuthCTALink } from '../../components/AuthCTALink';
import { AuthTitle } from '../../components/AuthTitle';
import { AuthView } from '../../components/AuthView';
import { VerifyEmailForm } from '../../components/VerifyEmailForm';
import { useVerifyEmailView } from './use';
import { useVerifyEmailViewTranslation } from './useTranslation';

export interface VerifyEmailViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'VerifyEmailScreen'
  > {}

export const VerifyEmailView: React.FC<VerifyEmailViewProps> = () => {
  const { titleBase, ctaHighlight, ctaBase } = useVerifyEmailViewTranslation();

  const { ctaOnPress } = useVerifyEmailView();

  return (
    <AuthView>
      <AuthCard>
        <AuthTitle base={titleBase} />

        <VerifyEmailForm />
      </AuthCard>

      <AuthCTALink
        base={ctaBase}
        highlight={ctaHighlight}
        onPress={ctaOnPress}
      />
    </AuthView>
  );
};
