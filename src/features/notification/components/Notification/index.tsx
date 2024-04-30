import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { Text } from '../../../../shared/components/Text';
import { colors, iconSizes } from '../../../../shared/styles/globalStyles';
import { Notification as INotification } from '../../interfaces/Notification';
import { notificationStyles } from './styles';

export interface NotificationProps {
  data: INotification;
  onPress?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  data: { message, title, type },
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={StyleSheet.compose(
        notificationStyles.container,
        notificationStyles[type],
      )}>
      <View style={notificationStyles.header}>
        <Text style={notificationStyles.title}>{title}</Text>
        <FeIcon name="x" color={colors.primaryText} size={iconSizes.sm} />
      </View>

      {message && <Text style={notificationStyles.message}>{message}</Text>}
    </TouchableOpacity>
  );
};
