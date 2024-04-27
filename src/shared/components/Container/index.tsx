import { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { containerStyles } from './styles';

export interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, style }) => {
  const containerStyle = useMemo(
    () => StyleSheet.compose(containerStyles.container, style),
    [style],
  );

  return <View style={containerStyle}>{children}</View>;
};
