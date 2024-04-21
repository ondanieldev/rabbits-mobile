import { configureStore } from '@reduxjs/toolkit';

import { authStore } from '../../features/auth/stores/authStore';
import { taskStore } from '../../features/routine/stores/taskStore';

export const reduxStore = configureStore({
  reducer: {
    auth: authStore.reducer,
    task: taskStore.reducer,
  },
});

export type ReduxStoreRootState = ReturnType<typeof reduxStore.getState>;
