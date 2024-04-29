import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../../../../shared/components/Text';
import { Notification as INotification } from '../../../routine/interfaces/Notification';
import { notificationStyles } from './styles';

export interface NotificationProps {
  data: Omit<INotification, 'id'>;
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
      <Text style={notificationStyles.title}>{title}</Text>

      <Text style={notificationStyles.message}>{message}</Text>
    </TouchableOpacity>
  );
};
