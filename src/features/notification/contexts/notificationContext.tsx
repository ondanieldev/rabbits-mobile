import { createContext, useContext, useEffect, useMemo } from 'react';

import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { Notification as INotification } from '../../routine/interfaces/Notification';
import { Notification } from '../components/Notification';
import { NotificationContainer } from '../components/NotificationContainer';
import {
  removeNotification,
  selectNotificationList,
} from '../stores/notificationStore';

export interface NotificationContext {
  notificationList: INotification[];
}

export const notificationContext = createContext<NotificationContext>({
  notificationList: [],
});

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Notification list
   */
  const notificationList = useSelector(selectNotificationList);

  /**
   * Notification component list
   */
  const Notifications = useMemo(
    () =>
      notificationList.map(({ id, ...data }) => (
        <Notification
          key={id}
          data={data}
          onPress={() => {
            dispatch(removeNotification(id));
          }}
        />
      )),
    [notificationList, dispatch],
  );

  /**
   * Remove newest notification after 5 seconds
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (notificationList.length > 0) {
        dispatch(removeNotification(notificationList[0].id));
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notificationList, dispatch]);

  /**
   * Return
   */
  const value = useMemo(() => ({ notificationList }), [notificationList]);

  return (
    <notificationContext.Provider value={value}>
      <>
        {children}

        <NotificationContainer>{Notifications}</NotificationContainer>
      </>
    </notificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(notificationContext);
};
