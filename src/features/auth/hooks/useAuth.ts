import { useAsync } from '../../../shared/hooks/useAsync';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { AuthService } from '../services/AuthService';
import { AuthTokenStorage } from '../storages/AuthTokenStorage';
import { setAuthToken } from '../stores/authStore';

export const useAuth = () => {
  const dispatch = useDispatch();

  const authToken = useSelector(state => state.auth.authToken);

  const { fetch: signUp, isLoading: isLoadingSignUp } = useAsync(
    AuthService.signUp,
    {
      errorOptions: {
        showAlert: true,
        title: 'signUpError',
      },
    },
  );

  const { fetch: signIn, isLoading: isLoadingSignIn } = useAsync(
    AuthService.signIn,
    {
      errorOptions: {
        title: 'signInError',
        showAlert: true,
      },
      onSuccess: response => {
        AuthTokenStorage.set(response);
        dispatch(setAuthToken(response));
      },
    },
  );

  const { fetch: signOut, isLoading: isLoadingSignOut } = useAsync(
    AuthService.signOut,
    {
      onSuccess: () => {
        AuthTokenStorage.delete();
        dispatch(setAuthToken(null));
      },
    },
  );

  const { fetch: readProfile, isLoading: isProfileLoading } = useAsync(
    AuthService.readProfile,
    {
      onSuccess: () => {
        dispatch(setAuthToken(AuthTokenStorage.get()));
      },
      onFailure: () => {
        AuthTokenStorage.delete();
        dispatch(setAuthToken(null));
      },
    },
  );

  return {
    authToken,
    signUp,
    isLoadingSignUp,
    signIn,
    isLoadingSignIn,
    signOut,
    isLoadingSignOut,
    readProfile,
    isProfileLoading,
  };
};
