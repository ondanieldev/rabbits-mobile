/* eslint react-native/no-inline-styles: 0 */

import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { TriggerNotification } from '@notifee/react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DefaultView } from '../../../../shared/components/DefaultView';
import { Divider } from '../../../../shared/components/Divider';
import { List } from '../../../../shared/components/List';
import { Text } from '../../../../shared/components/Text';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { colors, spacings } from '../../../../shared/styles/globalStyles';
import { NotificationService } from '../../../notification/services/NotificationService';

export interface DebugNotificationsViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'DebugNotificationsScreen'
  > {}

export const DebugNotificationsView: React.FC<
  DebugNotificationsViewProps
> = () => {
  const [notificationList, setNotificationList] =
    useState<TriggerNotification[]>();

  useEffect(() => {
    async function bootstrap() {
      const data = await NotificationService.readTriggerList();
      const copy = [...data];
      copy.sort((a, b) => {
        if (
          !a.notification.android?.timestamp ||
          !b.notification.android?.timestamp
        ) {
          return 0;
        }
        return (
          a.notification.android.timestamp - b.notification.android.timestamp
        );
      });
      setNotificationList(copy);
    }
    bootstrap();
  }, []);

  return (
    <DefaultView
      style={{ backgroundColor: colors.foreground, padding: spacings.md }}>
      <List
        contentContainerStyle={{ gap: spacings.md }}
        data={notificationList}
        renderItem={({ item }) => (
          <>
            <Divider />
            <View
              style={{
                gap: spacings.sm,
                paddingTop: spacings.md,
                paddingBottom: spacings.md,
              }}>
              <Prop name="ID" value={item.notification.id} />
              <Prop name="TITLE" value={item.notification.title} />
              <Prop
                name="CHANNEL ID"
                value={item.notification.android.channelId}
              />
              <Prop
                name="TIMESTAMP"
                value={item.notification.android.timestamp}
              />
              <Prop
                name="DATE"
                value={new Date(
                  item.notification.android.timestamp,
                ).toLocaleString()}
              />
            </View>
            <Divider />
          </>
        )}
      />
    </DefaultView>
  );
};

const Prop: React.FC<{ name: string; value: string }> = ({ name, value }) => {
  return (
    <View style={{ gap: 0 }}>
      <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{name}</Text>
      <Text>{value}</Text>
    </View>
  );
};
