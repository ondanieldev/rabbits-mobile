import {
  AndroidChannel,
  NotificationAndroid,
  AndroidImportance,
  AndroidCategory,
} from '@notifee/react-native';

export const notifeeSoundChannel: AndroidChannel = {
  id: 'sound',
  name: 'Sound channel',
  sound: 'alarmmorningjoy',
};

export const notifeeBaseNotificationAndroid: NotificationAndroid = {
  smallIcon: 'ic_launcher',
  pressAction: {
    id: 'default',
    launchActivity: 'default',
  },
  lightUpScreen: true,
  sound: 'alarmmorningjoy',
  vibrationPattern: [300, 100],
  loopSound: true,
  category: AndroidCategory.ALARM,
  importance: AndroidImportance.HIGH,
  showTimestamp: true,
};
