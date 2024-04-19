import './i18n';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useRoutineEditScreen } from './src/features/routine/screens/RoutineEditScreen/use';
import { useRoutineMainScreen } from './src/features/routine/screens/RoutineMainScreen/use';
import { useRoutineUpsertScreen } from './src/features/routine/screens/RoutineUpsertScreen/use';
import { Stack } from './src/shared/navigation/stack';

function App(): React.JSX.Element {
  const routineMainScreen = useRoutineMainScreen();
  const routineUpsertScreen = useRoutineUpsertScreen();
  const routineEditScreen = useRoutineEditScreen();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen {...routineMainScreen} />
        <Stack.Screen {...routineUpsertScreen} />
        <Stack.Screen {...routineEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
