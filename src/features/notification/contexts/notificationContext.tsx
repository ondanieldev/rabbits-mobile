import { createContext, useContext, useMemo, useState } from 'react';
import uuid from 'react-native-uuid';

import { Notification, NotificationProps } from '../components/Notification';
import { NotificationContainer } from '../components/NotificationContainer';

export interface NotificationContext {}

export const notificationContext = createContext({});

export const useNotificationProvider = () => {
  const [notificationProps, setNotificationProps] = useState<
    (NotificationProps & { id: string })[]
  >([
    {
      id: uuid.v4().toString(),
      message: 'This is a success message',
      title: 'Success',
      type: 'success',
    },
    {
      id: uuid.v4().toString(),
      message: 'This is an error message',
      title: 'Error',
      type: 'error',
    },
  ]);

  const notifications = useMemo(
    () =>
      notificationProps.map(({ id, ...props }) => (
        <Notification
          key={id}
          onPress={() => {
            setNotificationProps(notificationProps.filter(n => n.id !== id));
          }}
          {...props}
        />
      )),
    [notificationProps],
  );

  return { notifications };
};

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { notifications } = useNotificationProvider();

  return (
    <notificationContext.Provider value={{}}>
      <>
        {children}

        <NotificationContainer>{notifications}</NotificationContainer>
      </>
    </notificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(notificationContext);
};
