import { useEffect } from 'react';

import { AuthTokenStorage } from '../../features/auth/storages/AuthTokenStorage';
import {
  readProfile,
  setAuthToken,
} from '../../features/auth/stores/authStore';
import { useDispatch } from './useDispatch';
import { useSelector } from './useSelector';

export const useApp = () => {
  const dispatch = useDispatch();

  const authToken = useSelector(state => state.auth.authToken);
  const readProfileStatus = useSelector(state => state.auth.readProfileStatus);

  useEffect(() => {
    async function bootstrap() {
      try {
        await dispatch(readProfile()).unwrap();
        dispatch(setAuthToken(AuthTokenStorage.get()));
      } catch {
        AuthTokenStorage.delete();
        dispatch(setAuthToken(null));
      }
    }
    bootstrap();
  }, [dispatch]);

  return {
    authToken,
    readProfileStatus,
  };
};
