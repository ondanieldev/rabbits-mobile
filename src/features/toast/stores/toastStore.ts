import {
  EntityState,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { ReduxStoreRootState } from '../../../shared/stores/reduxStore';
import { Toast } from '../interfaces/Toast';

/**
 * State
 */
export interface ToastState {
  ids: EntityState<Toast, string>['ids'];
  entities: EntityState<Toast, string>['entities'];
}

/**
 * Adapaters
 */
export const toastAdapter = createEntityAdapter<Toast>({
  // Order toasts by timestamp in descending order (newest firts)
  sortComparer: (a, b) => {
    return b.timestamp - a.timestamp;
  },
});

/**
 * Initial state
 */
export const toastStoreInitialState: ToastState = toastAdapter.getInitialState(
  {},
);

/**
 * Slice
 */
export const toastStore = createSlice({
  name: 'toast',
  initialState: toastStoreInitialState,
  reducers: {
    addToast: toastAdapter.addOne,
    removeToast: toastAdapter.removeOne,
  },
});

/**
 * Selectors
 */
export const { selectAll: selectToastList } = toastAdapter.getSelectors(
  (state: ReduxStoreRootState) => state.toast,
);

/**
 * Actions
 */
export const { addToast, removeToast } = toastStore.actions;
