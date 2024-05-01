import notifee, {
  Notification,
  Trigger,
  TriggerType,
} from '@notifee/react-native';

import {
  notifeeBaseNotificationAndroid,
  notifeeSoundChannel,
} from '../data/notifee';
import { UpsertTriggerNotification } from '../interfaces/UpsertTriggerNotification';

export class NotificationService {
  static async setupBackgroundListener() {
    notifee.onBackgroundEvent(async () => {});
  }

  static async readTriggerList() {
    return notifee.getTriggerNotifications();
  }

  static async readTriggerIdList() {
    return notifee.getTriggerNotificationIds();
  }

  static async upsertTrigger({
    id,
    timestamp,
    title,
    body,
    sound,
    vibration,
  }: UpsertTriggerNotification) {
    const channelId = await notifee.createChannel(notifeeSoundChannel);

    const notification: Notification = {
      id,
      title,
      body,
      android: {
        channelId,
        timestamp,
        ...notifeeBaseNotificationAndroid,
      },
    };

    if (!sound && notification.android) {
      notification.android.channelId = 'default';
      delete notification.android.sound;
    }

    if (!vibration && notification.android) {
      delete notification.android.vibrationPattern;
    }

    const trigger: Trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp,
    };

    await notifee.createTriggerNotification(notification, trigger);
  }

  static async delete(id: string) {
    return notifee.cancelNotification(id);
  }
}
