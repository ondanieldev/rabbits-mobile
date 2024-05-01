import { createContext, useContext, useEffect, useMemo } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { User } from '../../../shared/interfaces/User';
import { useAuth } from '../../auth/contexts/authContext';
import { readProfile, selectProfile } from '../stores/profileStore';

/**
 * Interface
 */
export interface ProfileContext {
  profile: User | null;
  readProfileStatus: AsyncStatus;
}

/**
 * Context
 */
export const ProfileContext = createContext<ProfileContext>({
  profile: null,
  readProfileStatus: 'idle',
});

/**
 * Context provider
 */
export const ProfileProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Auth setup
   */
  const { authToken } = useAuth();

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * State to be distributed
   */
  const profile = useSelector(selectProfile);
  const readProfileStatus = useSelector(
    state => state.profile.readProfileStatus,
  );

  /**
   * Read profile on load or auth changing
   */
  useEffect(() => {
    dispatch(readProfile());
  }, [authToken, dispatch]);

  /**
   * Return
   */
  const value = useMemo(
    () => ({
      profile,
      readProfileStatus,
    }),
    [profile, readProfileStatus],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
