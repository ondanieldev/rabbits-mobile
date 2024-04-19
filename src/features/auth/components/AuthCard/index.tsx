import { View } from 'react-native';

import { authCardStyles } from './styles';

export interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return <View style={authCardStyles.card}>{children}</View>;
};
