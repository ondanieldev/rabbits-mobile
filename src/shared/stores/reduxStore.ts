import { configureStore } from '@reduxjs/toolkit';

import { authStore } from '../../features/auth/stores/authStore';

export const reduxStore = configureStore({
  reducer: {
    auth: authStore.reducer,
  },
});

export type ReduxStoreRootState = ReturnType<typeof reduxStore.getState>;
