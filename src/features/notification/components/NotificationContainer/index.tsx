import { View } from 'react-native';

import { notificationContainerStyles } from './styles';

export interface NotificationContainerProps {
  children: React.ReactNode;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  children,
}) => {
  return (
    <View style={notificationContainerStyles.wrapper}>
      <View style={notificationContainerStyles.contentContainer}>
        {children}
      </View>
    </View>
  );
};
