import './i18n';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AddToRoutineScreen } from './src/features/routine/screens/AddToRoutineScreen';
import { EditRoutineScreen } from './src/features/routine/screens/EditRoutineScreen';
import { RoutineScreen } from './src/features/routine/screens/RoutineScreen';
import { useApp } from './src/shared/hooks/useApp';
import { Stack } from './src/shared/navigation/stack';
import { appStyles } from './src/shared/styles/appStyles';

function App(): React.JSX.Element {
  const { routineScreen, addToRoutineScreen, editRoutineScreen } = useApp();

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
            title: addToRoutineScreen.title,
            headerStyle: appStyles.header,
            headerTintColor: appStyles.header.color,
          }}
        />

        <Stack.Screen
          name="EditRoutineScreen"
          component={EditRoutineScreen}
          options={{
            title: editRoutineScreen.title,
            headerStyle: appStyles.header,
            headerTintColor: appStyles.header.color,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
