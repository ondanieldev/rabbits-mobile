import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';

import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { Notification as INotification } from '../../routine/interfaces/Notification';
import { Notification as BaseNotification } from '../components/Notification';
import { NotificationContainer } from '../components/NotificationContainer';
import {
  addNotification,
  removeNotification,
  selectNotificationList,
} from '../stores/notificationStore';

export interface NotificationContext {
  notificationList: INotification[];
  notify: (data: Omit<INotification, 'id' | 'timestamp'>) => void;
}

export const notificationContext = createContext<NotificationContext>({
  notificationList: [],
  notify: () => {},
});

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Translation setup
   */
  const { t } = useTranslation('notification');

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
  const Notification = useMemo<JSX.Element | null>(() => {
    if (!notificationList.length) {
      return null;
    }
    const { id, ...data } = notificationList[0];
    return (
      <BaseNotification
        data={data}
        onPress={() => {
          dispatch(removeNotification(id));
        }}
      />
    );
  }, [notificationList, dispatch]);

  /**
   * Create notification
   */
  const notify = useCallback(
    (
      { title, message, ...data }: Omit<INotification, 'id' | 'timestamp'>,
      translate = true,
    ) => {
      dispatch(
        addNotification({
          id: uuid.v4().toString(),
          title: translate ? t(title) : title,
          message: translate && message ? t(message) : message,
          timestamp: new Date().getTime(),
          ...data,
        }),
      );
    },
    [dispatch, t],
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
  const value = useMemo(
    () => ({ notificationList, notify }),
    [notificationList, notify],
  );

  return (
    <notificationContext.Provider value={value}>
      <>
        {children}

        {Notification && (
          <NotificationContainer>{Notification}</NotificationContainer>
        )}
      </>
    </notificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(notificationContext);
};
