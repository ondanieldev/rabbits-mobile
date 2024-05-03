import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { AuthCard } from '../../components/AuthCard';
import { AuthCTALink } from '../../components/AuthCTALink';
import { AuthTitle } from '../../components/AuthTitle';
import { AuthView } from '../../components/AuthView';
import { ResetPasswordValidateTokenForm } from '../../components/ResetPasswordValidateTokenForm';
import { useResetPasswordValidateTokenView } from './use';
import { useResetPasswordValidateTokenViewTranslation } from './useTranslation';

export interface ResetPasswordValidateTokenScreenParams {
  email: string;
}

export interface ResetPasswordValidateTokenViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'ResetPasswordValidateTokenScreen'
  > {}

export const ResetPasswordValidateTokenView: React.FC<
  ResetPasswordValidateTokenViewProps
> = ({ route }) => {
  const { email } = route.params;

  const { titleBase, ctaBase, ctaHighlight } =
    useResetPasswordValidateTokenViewTranslation();

  const { ctaOnPress } = useResetPasswordValidateTokenView({ email });

  return (
    <AuthView>
      <AuthCard>
        <AuthTitle base={titleBase} />

        <ResetPasswordValidateTokenForm email={email} />
      </AuthCard>

      <AuthCTALink
        base={ctaBase}
        highlight={ctaHighlight}
        onPress={ctaOnPress}
      />
    </AuthView>
  );
};
