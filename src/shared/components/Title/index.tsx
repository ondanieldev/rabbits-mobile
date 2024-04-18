import { Text } from 'react-native';

import { titleStyles } from './styles';

interface TitleProps {
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children }) => (
  <Text style={titleStyles.root}>{children}</Text>
);
