import { useMemo } from 'react';

import { useAuth } from '../../features/auth/contexts/authContext';
import { useProfile } from '../../features/profile/contexts/profileContext';

export function useApp() {
  const { authToken, pingStatus } = useAuth();
  const { profile, readProfileStatus } = useProfile();

  const showSplashScreen = useMemo(() => {
    return (
      pingStatus === 'idle' ||
      pingStatus === 'pending' ||
      readProfileStatus === 'idle' ||
      readProfileStatus === 'pending'
    );
  }, [pingStatus, readProfileStatus]);

  const showAuthScreens = useMemo(() => {
    return authToken === null;
  }, [authToken]);

  const showVerifyEmailScreens = useMemo(() => {
    return !profile?.isEmailVerified;
  }, [profile]);

  const showMainScreens = useMemo(() => {
    return !showAuthScreens && !showVerifyEmailScreens;
  }, [showAuthScreens, showVerifyEmailScreens]);

  return {
    showSplashScreen,
    showAuthScreens,
    showVerifyEmailScreens,
    showMainScreens,
  };
}
