import { configureStore } from '@reduxjs/toolkit';

import { authStore } from '../../features/auth/stores/authStore';
import { notificationStore } from '../../features/notification/stores/notificationStore';
import { appointmentStore } from '../../features/routine/stores/appointmentStore';
import { completedTaskStore } from '../../features/routine/stores/completedTaskStore';
import { taskStore } from '../../features/routine/stores/taskStore';

export const reduxStore = configureStore({
  reducer: {
    appointment: appointmentStore.reducer,
    auth: authStore.reducer,
    completedTask: completedTaskStore.reducer,
    notification: notificationStore.reducer,
    task: taskStore.reducer,
  },
});

export type ReduxStoreRootState = ReturnType<typeof reduxStore.getState>;
