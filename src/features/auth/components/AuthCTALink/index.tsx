import { TouchableHighlight, View } from 'react-native';

import { Text } from '../../../../shared/components/Text';
import { authCTALinkStyles } from './styles';

export interface AuthCTALinkProps {
  base: string;
  highlight: string;
  onPress: () => void;
}

export const AuthCTALink: React.FC<AuthCTALinkProps> = ({
  base,
  highlight,
  onPress,
}) => {
  return (
    <View style={authCTALinkStyles.container}>
      <Text>{base}</Text>
      <TouchableHighlight onPress={onPress}>
        <Text style={authCTALinkStyles.highlight}>{highlight}</Text>
      </TouchableHighlight>
    </View>
  );
};
