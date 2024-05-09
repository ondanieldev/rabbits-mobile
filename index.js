/**
 * @format
 */

import { AppRegistry } from 'react-native';

import { AppWrapper } from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => {
  if (process.env.STORYBOOK_ENABLED === 'true') {
    return require('./.storybook').default;
  }
  return AppWrapper;
});
