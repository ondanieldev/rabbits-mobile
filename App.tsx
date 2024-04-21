import './i18n';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { AuthService } from './src/features/auth/services/AuthService';
import { AuthTokenStorage } from './src/features/auth/storages/AuthTokenStorage';
import { setAuthToken } from './src/features/auth/stores/authStore';
import { AuthSignInView } from './src/features/auth/views/AuthSignInView';
import { AuthSignUpView } from './src/features/auth/views/AuthSignUpView';
import { useRoutineEditScreen } from './src/features/routine/screens/RoutineEditScreen/use';
import { useRoutineMainScreen } from './src/features/routine/screens/RoutineMainScreen/use';
import { useRoutineUpsertScreen } from './src/features/routine/screens/RoutineUpsertScreen/use';
import { useAsync } from './src/shared/hooks/useAsync';
import { useSelector } from './src/shared/hooks/useSelector';
import { Stack } from './src/shared/navigation/stack';
import { ReduxProvider } from './src/shared/stores/ReduxProvider';
import { SplashView } from './src/shared/views/SplashView';

export function AppWrapper(): React.JSX.Element {
  return (
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
}

export function App(): React.JSX.Element {
  const dispatch = useDispatch();

  const authToken = useSelector(state => state.auth.authToken);

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

  const routineMainScreen = useRoutineMainScreen();
  const routineUpsertScreen = useRoutineUpsertScreen();
  const routineEditScreen = useRoutineEditScreen();

  useEffect(() => {
    readProfile({});
    //  eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this once
  }, []);

  if (isProfileLoading) {
    return <SplashView />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authToken === null ? (
          <>
            <Stack.Screen
              component={AuthSignInView}
              name={'AuthSignInScreen'}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              component={AuthSignUpView}
              name={'AuthSignUpScreen'}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen {...routineMainScreen} />
            <Stack.Screen {...routineUpsertScreen} />
            <Stack.Screen {...routineEditScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
