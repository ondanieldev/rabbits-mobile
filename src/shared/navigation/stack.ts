import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RoutineScreenParams } from '../../features/routine/screens/RoutineScreen';

export type StackNavigationParamList = {
  RoutineScreen: RoutineScreenParams;
  AddToRoutineScreen: {};
  EditRoutineScreen: {};
};

export type StackNavigationProp = NavigationProp<StackNavigationParamList>;

export const Stack = createNativeStackNavigator<StackNavigationParamList>();
