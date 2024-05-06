import { TouchableHighlight, View } from 'react-native';

import { Text } from '../../../../shared/components/Text';
import { authCTALinkStyles } from './styles';

export interface AuthCTALinkProps {
  base?: string;
  highlight?: string;
  onPress: () => void;
}

export const AuthCTALink: React.FC<AuthCTALinkProps> = ({
  base,
  highlight,
  onPress,
}) => {
  return (
    <View style={authCTALinkStyles.container}>
      {base && <Text style={authCTALinkStyles.base}>{base}</Text>}
      <TouchableHighlight onPress={onPress}>
        {highlight && (
          <Text style={authCTALinkStyles.highlight}>{highlight}</Text>
        )}
      </TouchableHighlight>
    </View>
  );
};
