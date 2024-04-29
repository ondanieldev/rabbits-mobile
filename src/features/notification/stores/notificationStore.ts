import {
  EntityState,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { ReduxStoreRootState } from '../../../shared/stores/reduxStore';
import { Notification } from '../../routine/interfaces/Notification';

/**
 * State
 */
export interface NotificationState {
  ids: EntityState<Notification, string>['ids'];
  entities: EntityState<Notification, string>['entities'];
}

/**
 * Adapaters
 */
export const notificationAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => {
    return a.timestamp - b.timestamp;
  },
});

/**
 * Initial state
 */
export const notificationStoreInitialState: NotificationState =
  notificationAdapter.getInitialState({});

/**
 * Slice
 */
export const notificationStore = createSlice({
  name: 'notification',
  initialState: notificationStoreInitialState,
  reducers: {
    addNotification: notificationAdapter.addOne,
    removeNotification: notificationAdapter.removeOne,
  },
});

/**
 * Selectors
 */
export const { selectAll: selectNotificationList } =
  notificationAdapter.getSelectors(
    (state: ReduxStoreRootState) => state.notification,
  );

/**
 * Actions
 */
export const { addNotification, removeNotification } =
  notificationStore.actions;
