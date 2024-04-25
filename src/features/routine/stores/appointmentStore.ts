import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { OffsetPaginationQuery } from '../../../shared/interfaces/OffsetPaginationQuery';
import { ReduxStoreRootState } from '../../../shared/stores/reduxStore';
import { Appointment } from '../interfaces/Appointment';
import { CreateAppointment } from '../interfaces/CreateAppointment';
import { UpdateAppointment } from '../interfaces/UpdateAppointment';
import { AppointmentService } from '../services/AppointmentService';

/**
 * State
 */
export interface AppointmentState {
  ids: EntityState<Appointment, string>['ids'];
  entities: EntityState<Appointment, string>['entities'];
  appointmentListStatus: AsyncStatus;
  appointmentListError: string | null;
  createAppointmentStatus: AsyncStatus;
  createAppointmentError: string | null;
  updateAppointmentStatus: AsyncStatus;
  updateAppointmentError: string | null;
  deleteAppointmentStatus: AsyncStatus;
  deleteAppointmentError: string | null;
}

/**
 * Adapaters
 */
const appointmentAdapter = createEntityAdapter({
  sortComparer: (a: Appointment, b: Appointment) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  },
});

/**
 * Initial state
 */
export const appointmentStoreInitialState: AppointmentState =
  appointmentAdapter.getInitialState({
    appointmentListStatus: 'idle',
    appointmentListError: null,
    createAppointmentStatus: 'idle',
    createAppointmentError: null,
    updateAppointmentStatus: 'idle',
    updateAppointmentError: null,
    deleteAppointmentStatus: 'idle',
    deleteAppointmentError: null,
  });

/**
 * Thunks
 */
export const createAppointment = createAsyncThunk(
  'appointment/createAppointment',
  async (input: CreateAppointment) => AppointmentService.create(input),
);

export const readAppointmentList = createAsyncThunk(
  'appointment/readAppointmentList',
  async (input: OffsetPaginationQuery) => AppointmentService.readList(input),
);

export const updateAppointment = createAsyncThunk(
  'appointment/updateAppointment',
  async (input: UpdateAppointment) => AppointmentService.update(input),
);

export const deleteAppointment = createAsyncThunk(
  'appointment/deleteAppointment',
  async (appointmentId: string) => AppointmentService.delete(appointmentId),
);

/**
 * Slice
 */
export const appointmentStore = createSlice({
  name: 'appointment',
  initialState: appointmentStoreInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createAppointment.pending, state => {
        state.createAppointmentStatus = 'pending';
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.createAppointmentStatus = 'fulfilled';
        appointmentAdapter.addOne(state, action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.createAppointmentStatus = 'rejected';
        state.createAppointmentError = action.error.message || null;
      })

      .addCase(readAppointmentList.pending, state => {
        state.appointmentListStatus = 'pending';
      })
      .addCase(readAppointmentList.fulfilled, (state, action) => {
        state.appointmentListStatus = 'fulfilled';
        appointmentAdapter.setAll(state, action.payload.items);
      })
      .addCase(readAppointmentList.rejected, (state, action) => {
        state.appointmentListStatus = 'rejected';
        state.appointmentListError = action.error.message || null;
      })

      .addCase(updateAppointment.pending, state => {
        state.updateAppointmentStatus = 'pending';
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.updateAppointmentStatus = 'fulfilled';
        const existing = state.entities[action.payload.id];
        Object.assign(existing, action.payload);
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.updateAppointmentStatus = 'rejected';
        state.createAppointmentError = action.error.message || null;
      })

      .addCase(deleteAppointment.pending, state => {
        state.createAppointmentStatus = 'pending';
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.createAppointmentStatus = 'fulfilled';
        appointmentAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.createAppointmentStatus = 'rejected';
        state.createAppointmentError = action.error.message || null;
      });
  },
});

/**
 * Selectors
 */
export const {
  selectAll: selectAppointmentList,
  selectById: selectAppointment,
} = appointmentAdapter.getSelectors(
  (state: ReduxStoreRootState) => state.appointment,
);
