import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';

import { colors } from '../../styles/globalStyles';
import { baseButtonStyles } from './styles';

export interface ButtonProps extends TouchableHighlightProps {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  style,
  ...props
}) => {
  return (
    <TouchableHighlight
      style={StyleSheet.compose(
        baseButtonStyles.touchable,
        StyleSheet.compose(
          style,
          isLoading && baseButtonStyles.touchableDisabled,
        ),
      )}
      disabled={isLoading}
      {...props}>
      <>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.background} animating />
        ) : (
          children
        )}
      </>
    </TouchableHighlight>
  );
};
