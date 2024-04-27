import { useMemo } from 'react';
import { StatusBar, StyleSheet, View, ViewProps } from 'react-native';

import { statusBarProps } from './data';
import { defaultViewStyles } from './styles';

export interface DefaultViewProps extends ViewProps {}

export const DefaultView: React.FC<DefaultViewProps> = ({
  children,
  style,
  ...props
}) => {
  const viewStyle = useMemo(
    () => StyleSheet.compose(defaultViewStyles.root, style),
    [style],
  );

  return (
    <View style={viewStyle} {...props}>
      <StatusBar {...statusBarProps} />
      {children}
    </View>
  );
};
