import { createContext, useContext, useEffect, useMemo } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { AuthToken } from '../interfaces/AuthToken';
import { AuthTokenStorage } from '../storages/AuthTokenStorage';
import { readProfile, setAuthToken } from '../stores/authStore';

/**
 * Interface
 */
export interface AuthContext {
  authToken: AuthToken | null;
  readProfileStatus: AsyncStatus;
}

/**
 * Context
 */
export const AuthContext = createContext<AuthContext>({
  authToken: null,
  readProfileStatus: 'idle',
});

/**
 * Context provider
 */
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * State to be distributed
   */
  const authToken = useSelector(state => state.auth.authToken);
  const readProfileStatus = useSelector(state => state.auth.readProfileStatus);

  /**
   * Read profile on load
   * - If the user is authenticated, copy token from storage to redux
   * - If the user is NOT authenticated, remove token from storage
   */
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

  /**
   * Return
   */
  const value = useMemo(
    () => ({
      authToken,
      readProfileStatus,
    }),
    [authToken, readProfileStatus],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Context hook
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
