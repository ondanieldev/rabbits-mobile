import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { User } from '../../../shared/interfaces/User';
import { ReduxStoreRootState } from '../../../shared/stores/reduxStore';
import { UpsertPreferenceSchema } from '../schemas/upsertPreferenceScema';
import { PreferenceService } from '../services/PreferenceService';
import { ProfileService } from '../services/ProfileService';

/**
 * State
 */
export interface ProfileState {
  profile: User | null;
  readProfileStatus: AsyncStatus;
  readProfileError: string | null;
  upsertPreferenceStatus: AsyncStatus;
  upsertPreferenceError: string | null;
}

/**
 * Initial state
 */
const profileInitialState: ProfileState = {
  profile: null,
  readProfileStatus: 'idle',
  readProfileError: null,
  upsertPreferenceStatus: 'idle',
  upsertPreferenceError: null,
};

/**
 * Thunks
 */
export const readProfile = createAsyncThunk('profile/readProfile', async () =>
  ProfileService.readProfile(),
);

export const upsertPreference = createAsyncThunk(
  'profile/upsertPreference',
  async (input: UpsertPreferenceSchema) => PreferenceService.upsert(input),
);

/**
 * Store
 */
export const profileStore = createSlice({
  name: 'profile',
  initialState: profileInitialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        Object.assign(state.profile, action.payload);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(readProfile.pending, state => {
        state.readProfileStatus = 'pending';
      })
      .addCase(readProfile.fulfilled, (state, action) => {
        state.readProfileStatus = 'fulfilled';
        state.profile = action.payload;
      })
      .addCase(readProfile.rejected, (state, action) => {
        state.readProfileStatus = 'rejected';
        state.readProfileError = action.error.message || null;
      })

      .addCase(upsertPreference.pending, state => {
        state.upsertPreferenceStatus = 'pending';
      })
      .addCase(upsertPreference.fulfilled, (state, action) => {
        state.upsertPreferenceStatus = 'fulfilled';
        state.profile = action.payload;
      })
      .addCase(upsertPreference.rejected, (state, action) => {
        state.upsertPreferenceStatus = 'rejected';
        state.upsertPreferenceError = action.error.message || null;
      });
  },
});

/**
 * Selectors
 */
export const selectProfile = (state: ReduxStoreRootState) =>
  state.profile.profile;

/**
 * Actions
 */
export const { updateProfile } = profileStore.actions;
