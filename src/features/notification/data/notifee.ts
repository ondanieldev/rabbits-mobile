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
  vibration: false,
};

export const notifeeVibrationChannel: AndroidChannel = {
  id: 'vibration',
  name: 'Vibration channel',
  vibration: true,
  vibrationPattern: [300, 100],
};

export const notifeeSoundAndVibrationChannel: AndroidChannel = {
  id: 'sound-and-vibration',
  name: 'Sound and vibration channel',
  sound: 'alarmmorningjoy',
  vibration: true,
  vibrationPattern: [300, 100],
};

export const notifeeBaseNotificationAndroid: NotificationAndroid = {
  smallIcon: 'ic_launcher',
  pressAction: {
    id: 'default',
    launchActivity: 'default',
  },
  lightUpScreen: true,
  category: AndroidCategory.ALARM,
  importance: AndroidImportance.HIGH,
  showTimestamp: true,
};
