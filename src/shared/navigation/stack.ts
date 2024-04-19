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

export const stackScreenNames = [
  'AuthSignInScreen',
  'AuthSignUpScreen',
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
  AuthSignInScreen: {};
  AuthSignUpScreen: {};
  RoutineMainScreen: {};
  RoutineUpsertScreen: {};
  RoutineEditScreen: {};
};

export type StackNavigationProp = NavigationProp<StackNavigationParamList>;

export const Stack = createNativeStackNavigator<StackNavigationParamList>();
