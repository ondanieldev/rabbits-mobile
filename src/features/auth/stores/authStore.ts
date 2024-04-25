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
  readProfileStatus: AsyncStatus;
  readProfileError: string | null;
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
  readProfileStatus: 'idle',
  readProfileError: null,
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
export const readProfile = createAsyncThunk('auth/readProfile', async () =>
  AuthService.readProfile(),
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
      .addCase(readProfile.pending, state => {
        state.readProfileStatus = 'pending';
      })
      .addCase(readProfile.fulfilled, state => {
        state.readProfileStatus = 'fulfilled';
      })
      .addCase(readProfile.rejected, (state, action) => {
        state.readProfileStatus = 'rejected';
        state.readProfileError = action.error.message || null;
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
