import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { AuthCard } from '../../components/AuthCard';
import { AuthCTALink } from '../../components/AuthCTALink';
import { AuthTitle } from '../../components/AuthTitle';
import { AuthView } from '../../components/AuthView';
import { UpdateEmailForm } from '../../components/UpdateEmailForm';
import { useUpdateEmailView } from './use';
import { useUpdateEmailViewTranslation } from './useTranslation';

export interface UpdateEmailViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'UpdateEmailScreen'
  > {}

export const UpdateEmailView: React.FC<UpdateEmailViewProps> = () => {
  const { titleBase, ctaHighlight } = useUpdateEmailViewTranslation();

  const { ctaOnPress } = useUpdateEmailView();

  return (
    <AuthView>
      <AuthCard>
        <AuthTitle base={titleBase} />

        <UpdateEmailForm />
      </AuthCard>

      <AuthCTALink highlight={ctaHighlight} onPress={ctaOnPress} />
    </AuthView>
  );
};
