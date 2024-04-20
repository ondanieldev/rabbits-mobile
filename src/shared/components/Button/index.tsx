import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';

import { colors } from '../../styles/globalStyles';
import { buttonStyles } from './styles';

export interface ButtonProps extends TouchableHighlightProps {
  children: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <TouchableHighlight
      style={StyleSheet.compose(
        buttonStyles.touchable,
        isLoading && buttonStyles.touchableDisabled,
      )}
      disabled={isLoading}
      {...props}>
      <>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.background} animating />
        ) : (
          <Text style={buttonStyles.text}>{children}</Text>
        )}
      </>
    </TouchableHighlight>
  );
};
