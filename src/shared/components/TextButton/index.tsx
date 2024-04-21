import { StyleSheet, Text } from 'react-native';

import { Button, ButtonProps } from '../Button';
import { textButtonStyles } from './styles';

export interface TextButtonProps extends ButtonProps {
  children: string;
  isLoading?: boolean;
}

export const TextButton: React.FC<TextButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Button
      style={StyleSheet.compose(textButtonStyles.touchable, style)}
      {...props}>
      <Text style={textButtonStyles.text}>{children}</Text>
    </Button>
  );
};
