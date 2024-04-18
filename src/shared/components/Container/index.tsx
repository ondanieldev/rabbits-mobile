import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { containerStyles } from './styles';

export interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, style }) => (
  <View style={StyleSheet.compose(containerStyles.container, style)}>
    {children}
  </View>
);
