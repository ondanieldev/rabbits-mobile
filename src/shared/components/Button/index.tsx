import {
  ActivityIndicator,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';

import { colors } from '../../styles/globalStyles';
import { useButton } from './use';

export interface ButtonProps extends TouchableHighlightProps {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  style,
  ...props
}) => {
  const { styles } = useButton({ style, isLoading });

  return (
    <TouchableHighlight style={styles.button} disabled={isLoading} {...props}>
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
