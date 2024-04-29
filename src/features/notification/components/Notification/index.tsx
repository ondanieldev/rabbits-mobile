import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../../../../shared/components/Text';
import { notificationStyles } from './styles';

export interface NotificationProps {
  title: string;
  message: string;
  type: 'success' | 'error';
  onPress?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  title,
  type,
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
