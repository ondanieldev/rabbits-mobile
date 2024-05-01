import notifee, {
  Notification,
  Trigger,
  TriggerType,
} from '@notifee/react-native';

import {
  notifeeBaseNotificationAndroid,
  notifeeSoundAndVibrationChannel,
  notifeeSoundChannel,
  notifeeVibrationChannel,
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
    let channelId = 'default';
    if (sound && vibration) {
      channelId = await notifee.createChannel(notifeeSoundAndVibrationChannel);
    } else if (sound) {
      channelId = await notifee.createChannel(notifeeSoundChannel);
    } else if (vibration) {
      channelId = await notifee.createChannel(notifeeVibrationChannel);
    }

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
