import { configureStore } from '@reduxjs/toolkit';

import { authStore } from '../../features/auth/stores/authStore';
import { appointmentStore } from '../../features/routine/stores/appointmentStore';
import { completedTaskStore } from '../../features/routine/stores/completedTaskStore';
import { taskStore } from '../../features/routine/stores/taskStore';

export const reduxStore = configureStore({
  reducer: {
    auth: authStore.reducer,
    task: taskStore.reducer,
    appointment: appointmentStore.reducer,
    completedTask: completedTaskStore.reducer,
  },
});

export type ReduxStoreRootState = ReturnType<typeof reduxStore.getState>;
