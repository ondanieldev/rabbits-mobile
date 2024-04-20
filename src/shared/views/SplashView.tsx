import { ActivityIndicator } from 'react-native';

import { DefaultView } from '../components/DefaultView';
import { colors } from '../styles/globalStyles';
import { splashViewStyles } from './styles';

export const SplashView: React.FC = () => {
  return (
    <DefaultView style={splashViewStyles.container}>
      <ActivityIndicator size="large" color={colors.primary} animating />
    </DefaultView>
  );
};
