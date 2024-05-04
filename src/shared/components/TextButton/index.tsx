import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { Button, ButtonProps } from '../Button';
import { textButtonStyles } from './styles';

export interface TextButtonProps extends ButtonProps {
  children: string;
  isLoading?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const TextButton: React.FC<TextButtonProps> = ({
  children,
  style,
  textStyle,
  ...props
}) => {
  return (
    <Button
      style={StyleSheet.compose(textButtonStyles.touchable, style)}
      {...props}>
      <Text style={StyleSheet.compose(textButtonStyles.text, textStyle)}>
        {children}
      </Text>
    </Button>
  );
};
