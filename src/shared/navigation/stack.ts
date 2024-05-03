import {
  EventMapBase,
  NavigationProp,
  NavigationState,
  RouteConfig,
  RouteProp,
} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { AuthSignInScreenParams } from '../../features/auth/views/AuthSignInView';
import { ResetPasswordGenerateTokenScreenParams } from '../../features/auth/views/ResetPasswordGenerateTokenView';
import { ResetPasswordValidateTokenScreenParams } from '../../features/auth/views/ResetPasswordValidateTokenView';
import { ResetPasswordScreenParams } from '../../features/auth/views/ResetPasswordView';
import { RoutineUpsertScreenParams } from '../../features/routine/screens/RoutineUpsertScreen/use';

export const stackScreenNames = [
  'AuthSignInScreen',
  'AuthSignUpScreen',
  'DebugNotificationsScreen',
  'PreferenceScreen',
  'ResetPasswordScreen',
  'ResetPasswordGenerateTokenScreen',
  'ResetPasswordValidateTokenScreen',
  'RoutineMainScreen',
  'RoutineUpsertScreen',
  'RoutineEditScreen',
] as const;

export type StackScreenName = (typeof stackScreenNames)[number];

export type StackRouteConfig<T extends StackScreenName> = RouteConfig<
  StackNavigationParamList,
  T,
  NavigationState,
  NativeStackNavigationOptions,
  EventMapBase
>;

export type StackScreenChildrenProps<T extends StackScreenName> = {
  route: RouteProp<StackNavigationParamList, T>;
  navigation: any;
};

export type StackScreenChildren<T extends StackScreenName> = (
  props: StackScreenChildrenProps<T>,
) => React.ReactNode;

export type StackNavigationParamList = {
  AuthSignInScreen: AuthSignInScreenParams;
  AuthSignUpScreen: {};
  DebugNotificationsScreen: {};
  PreferenceScreen: {};
  ResetPasswordScreen: ResetPasswordScreenParams;
  ResetPasswordGenerateTokenScreen: ResetPasswordGenerateTokenScreenParams;
  ResetPasswordValidateTokenScreen: ResetPasswordValidateTokenScreenParams;
  RoutineMainScreen: {};
  RoutineUpsertScreen: RoutineUpsertScreenParams;
  RoutineEditScreen: {};
};

export type StackNavigationProp = NavigationProp<StackNavigationParamList>;

export const Stack = createNativeStackNavigator<StackNavigationParamList>();
