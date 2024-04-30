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
import { Toast as BaseToast } from '../components/Toast';
import { ToastContainer } from '../components/ToastContainer';
import { CreateToast } from '../interfaces/CreateToast';
import { Toast as IToast } from '../interfaces/Toast';
import { addToast, removeToast, selectToastList } from '../stores/toastStore';

export interface ToastContext {
  toastList: IToast[];
  toastify: (data: CreateToast) => void;
}

export const toastContext = createContext<ToastContext>({
  toastList: [],
  toastify: () => {},
});

export const ToastProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Translation setup
   */
  const { t } = useTranslation('toast');

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Toast list
   */
  const toastList = useSelector(selectToastList);

  /**
   * Toast component list
   */
  const Toast = useMemo<JSX.Element | null>(() => {
    if (!toastList.length) {
      return null;
    }
    const toast = toastList[0];
    return (
      <BaseToast
        data={toast}
        onPress={() => {
          dispatch(removeToast(toast.id));
        }}
      />
    );
  }, [toastList, dispatch]);

  /**
   * Create toast
   */
  const toastify = useCallback(
    ({ title, message, ...data }: CreateToast, translate = true) => {
      dispatch(
        addToast({
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
   * Remove newest toast after 5 seconds
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (toastList.length > 0) {
        dispatch(removeToast(toastList[0].id));
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [toastList, dispatch]);

  /**
   * Return
   */
  const value = useMemo(() => ({ toastList, toastify }), [toastList, toastify]);

  return (
    <toastContext.Provider value={value}>
      <>
        {children}

        {Toast && <ToastContainer>{Toast}</ToastContainer>}
      </>
    </toastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(toastContext);
};
