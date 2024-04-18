import { StatusBar, View } from 'react-native';

import { colors } from '../../styles/globalStyles';
import { defaultViewStyles } from './styles';

export const DefaultView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <View style={defaultViewStyles.root}>
    <StatusBar barStyle="light-content" backgroundColor={colors.foreground} />
    {children}
  </View>
);
