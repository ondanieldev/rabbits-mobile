import {
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';

import { buttonStyles } from './styles';

export interface ButtonProps extends TouchableHighlightProps {
  children: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <TouchableHighlight style={buttonStyles.touchable} {...props}>
      <Text style={buttonStyles.text}>{children}</Text>
    </TouchableHighlight>
  );
};
