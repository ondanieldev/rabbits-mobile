import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { AuthCard } from '../../components/AuthCard';
import { AuthCTALink } from '../../components/AuthCTALink';
import { AuthTitle } from '../../components/AuthTitle';
import { AuthView } from '../../components/AuthView';
import { ResetPasswordGenerateTokenForm } from '../../components/ResetPasswordGenerateTokenForm';
import { useResetPasswordGenerateTokenView } from './use';
import { useResetPasswordGenerateTokenViewTranslation } from './useTranslation';

export interface ResetPasswordGenerateTokenScreenParams {
  email?: string;
}

export interface ResetPasswordGenerateTokenViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'ResetPasswordGenerateTokenScreen'
  > {}

export const ResetPasswordGenerateTokenView: React.FC<
  ResetPasswordGenerateTokenViewProps
> = ({ route }) => {
  const { email } = route.params;

  const { titleBase, ctaHighlight } =
    useResetPasswordGenerateTokenViewTranslation();

  const { ctaOnPress } = useResetPasswordGenerateTokenView();

  return (
    <AuthView>
      <AuthCard>
        <AuthTitle base={titleBase} />

        <ResetPasswordGenerateTokenForm email={email} />
      </AuthCard>

      <AuthCTALink highlight={ctaHighlight} onPress={ctaOnPress} />
    </AuthView>
  );
};
