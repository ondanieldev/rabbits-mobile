import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '../interfaces/AuthState';
import { AuthToken } from '../interfaces/AuthToken';

const authInitialState: AuthState = {
  authToken: null,
};

export const authStore = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthToken | null>) => {
      state.authToken = action.payload;
    },
  },
});

export const { setAuthToken } = authStore.actions;
