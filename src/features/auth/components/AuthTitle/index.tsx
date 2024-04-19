import { Text, View } from 'react-native';

import { authTitleStyles } from './styles';

export interface AuthTitleProps {
  base: string;
  highlight: string;
}

export const AuthTitle: React.FC<AuthTitleProps> = ({ base, highlight }) => {
  return (
    <View style={authTitleStyles.container}>
      <Text style={authTitleStyles.base}>{base}</Text>
      <Text style={authTitleStyles.highlight}>{highlight}</Text>
    </View>
  );
};
