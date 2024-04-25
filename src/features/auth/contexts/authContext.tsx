import { createContext, useContext, useEffect, useMemo } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { AuthToken } from '../interfaces/AuthToken';
import { AuthTokenStorage } from '../storages/AuthTokenStorage';
import { readProfile, setAuthToken } from '../stores/authStore';

export interface AuthContext {
  authToken: AuthToken | null;
  readProfileStatus: AsyncStatus;
}

export const AuthContext = createContext<AuthContext>({
  authToken: null,
  readProfileStatus: 'idle',
});

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useDispatch();

  const authToken = useSelector(state => state.auth.authToken);
  const readProfileStatus = useSelector(state => state.auth.readProfileStatus);

  useEffect(() => {
    async function bootstrap() {
      try {
        await dispatch(readProfile()).unwrap();
        dispatch(setAuthToken(AuthTokenStorage.get()));
      } catch (err) {
        AuthTokenStorage.delete();
        dispatch(setAuthToken(null));
      }
    }

    if (readProfileStatus === 'idle') {
      bootstrap();
    }
  }, [dispatch, readProfileStatus]);

  const value = useMemo(
    () => ({
      authToken,
      readProfileStatus,
    }),
    [authToken, readProfileStatus],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
