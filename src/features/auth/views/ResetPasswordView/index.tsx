import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { AuthCard } from '../../components/AuthCard';
import { AuthTitle } from '../../components/AuthTitle';
import { AuthView } from '../../components/AuthView';
import { ResetPasswordForm } from '../../components/ResetPasswordForm';
import { useResetPasswordViewTranslation } from './useTranslation';

export interface ResetPasswordScreenParams {
  email: string;
  token: string;
}

export interface ResetPasswordViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'ResetPasswordScreen'
  > {}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({
  route,
}) => {
  const { titleBase } = useResetPasswordViewTranslation();

  return (
    <AuthView>
      <AuthCard>
        <AuthTitle base={titleBase} />

        <ResetPasswordForm {...route.params} />
      </AuthCard>
    </AuthView>
  );
};
