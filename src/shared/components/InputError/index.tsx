import { Text } from 'react-native';

import { inputErrorStyles } from './styles';

export interface InputErrorProps {
  children: string;
}

export const InputError: React.FC<InputErrorProps> = ({ children }) => {
  return <Text style={inputErrorStyles.message}>{children}</Text>;
};
