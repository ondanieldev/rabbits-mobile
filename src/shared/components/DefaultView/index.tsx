import { StatusBar, StyleSheet, View, ViewProps } from 'react-native';

import { colors } from '../../styles/globalStyles';
import { defaultViewStyles } from './styles';

export interface DefaultViewProps extends ViewProps {}

export const DefaultView: React.FC<DefaultViewProps> = ({
  children,
  style,
  ...props
}) => (
  <View
    style={StyleSheet.compose(defaultViewStyles.root, style && style)}
    {...props}>
    <StatusBar barStyle="light-content" backgroundColor={colors.foreground} />
    {children}
  </View>
);
