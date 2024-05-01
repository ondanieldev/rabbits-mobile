import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { ReduxStoreRootState } from '../../../shared/stores/reduxStore';
import { AuthToken } from '../interfaces/AuthToken';
import { SignIn } from '../interfaces/SignIn';
import { SignUp } from '../interfaces/SignUp';
import { AuthService } from '../services/AuthService';

/**
 * State
 */
export interface AuthState {
  authToken: AuthToken | null;
  pingStatus: AsyncStatus;
  pingError: string | null;
  signInStatus: AsyncStatus;
  signInError: string | null;
  signUpStatus: AsyncStatus;
  signUpError: string | null;
  signOutStatus: AsyncStatus;
  signOutError: string | null;
}

/**
 * Initial state
 */
const authInitialState: AuthState = {
  authToken: null,
  pingStatus: 'idle',
  pingError: null,
  signInStatus: 'idle',
  signInError: null,
  signUpStatus: 'idle',
  signUpError: null,
  signOutStatus: 'idle',
  signOutError: null,
};

/**
 * Thunks
 */
export const ping = createAsyncThunk('auth/ping', async () =>
  AuthService.ping(),
);

export const signIn = createAsyncThunk('auth/signIn', async (input: SignIn) =>
  AuthService.signIn(input),
);

export const signUp = createAsyncThunk('auth/signUp', async (input: SignUp) =>
  AuthService.signUp(input),
);

export const signOut = createAsyncThunk('auth/signOut', async () =>
  AuthService.signOut(),
);

/**
 * Store
 */
export const authStore = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthToken | null>) => {
      state.authToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ping.pending, state => {
        state.pingStatus = 'pending';
      })
      .addCase(ping.fulfilled, state => {
        state.pingStatus = 'fulfilled';
      })
      .addCase(ping.rejected, (state, action) => {
        state.pingStatus = 'rejected';
        state.pingError = action.error.message || null;
      })

      .addCase(signIn.pending, state => {
        state.signInStatus = 'pending';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signInStatus = 'fulfilled';
        state.authToken = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInStatus = 'rejected';
        state.signInError = action.error.message || null;
      })

      .addCase(signUp.pending, state => {
        state.signUpStatus = 'pending';
      })
      .addCase(signUp.fulfilled, state => {
        state.signUpStatus = 'fulfilled';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpStatus = 'rejected';
        state.signUpError = action.error.message || null;
      })

      .addCase(signOut.pending, state => {
        state.signOutStatus = 'pending';
      })
      .addCase(signOut.fulfilled, state => {
        state.signOutStatus = 'fulfilled';
        state.authToken = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.signOutStatus = 'rejected';
        state.signOutError = action.error.message || null;
      });
  },
});

/**
 * Selectors
 */
export const selectAuthToken = (state: ReduxStoreRootState) =>
  state.auth.authToken;

/**
 * Actions
 */
export const { setAuthToken } = authStore.actions;
