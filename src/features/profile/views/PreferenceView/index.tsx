import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Container } from '../../../../shared/components/Container';
import { DefaultView } from '../../../../shared/components/DefaultView';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { UpsertPreferenceForm } from '../../components/UpsertPreferenceForm';
import { preferenceViewStyles } from './styles';

export interface PreferencesViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'PreferenceScreen'
  > {}

export const PreferenceView: React.FC<PreferencesViewProps> = ({}) => {
  return (
    <DefaultView>
      <Container style={preferenceViewStyles.container}>
        <UpsertPreferenceForm />
      </Container>
    </DefaultView>
  );
};
