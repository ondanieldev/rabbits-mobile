import { Text } from 'react-native';

import { inputLabelStyles } from './styles';

export interface InputLabelProps {
  children: string;
}

export const InputLabel: React.FC<InputLabelProps> = ({ children }) => {
  return <Text style={inputLabelStyles.label}>{children}</Text>;
};