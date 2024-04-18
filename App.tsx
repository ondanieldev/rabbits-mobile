import './i18n';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AddToRoutineScreen } from './src/features/routine/screens/AddToRoutineScreen';
import { RoutineScreen } from './src/features/routine/screens/RoutineScreen';
import { useApp } from './src/shared/hooks/useApp';
import { Stack } from './src/shared/navigation/stack';
import { appStyles } from './src/shared/styles/appStyles';

function App(): React.JSX.Element {
  const { routineScreen } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RoutineScreen"
          options={() => ({
            headerTitle: () => routineScreen.getHeaderTitle(),
            headerRight: () => routineScreen.getHeaderRight(),
            headerStyle: appStyles.header,
          })}>
          {/* TODO: remove it and use react context or redux instead */}
          {props => (
            <RoutineScreen
              {...props}
              referenceDate={routineScreen.referenceDate}
              setReferenceDate={routineScreen.setReferenceDate}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="AddToRoutineScreen"
          component={AddToRoutineScreen}
          options={{
            title: 'Add to your routine a...',
            headerStyle: appStyles.header,
            headerTintColor: appStyles.header.color,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
