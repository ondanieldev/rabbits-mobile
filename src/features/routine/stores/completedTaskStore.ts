import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { ReduxStoreRootState } from '../../../shared/stores/reduxStore';
import { CompletedTask } from '../interfaces/CompletedTask';
import { CreateCompletedTask } from '../interfaces/CreateCompletedTask';
import { ReadCompletedTaskList } from '../interfaces/RadCompletedTaskList';
import { CompletedTaskService } from '../services/CompletedTaskService';

/**
 * State
 */
export interface CompletedTaskState {
  ids: EntityState<CompletedTask, string>['ids'];
  entities: EntityState<CompletedTask, string>['entities'];
  completedTaskListStatus: AsyncStatus;
  completedTaskListError: string | null;
  createCompletedTaskStatus: AsyncStatus;
  createCompletedTaskError: string | null;
  deleteCompletedTaskStatus: AsyncStatus;
  deleteCompletedTaskError: string | null;
}

/**
 * Adapaters
 */
const completedTaskAdapter = createEntityAdapter({
  selectId: (completedTask: CompletedTask) => completedTask.id,
});

/**
 * Initial state
 */
export const completedTaskStoreInitialState: CompletedTaskState =
  completedTaskAdapter.getInitialState({
    completedTaskListStatus: 'idle',
    completedTaskListError: null,
    createCompletedTaskStatus: 'idle',
    createCompletedTaskError: null,
    deleteCompletedTaskStatus: 'idle',
    deleteCompletedTaskError: null,
  });

/**
 * Thunks
 */
export const createCompletedTask = createAsyncThunk(
  'completedTask/createCompletedTask',
  async (input: CreateCompletedTask) => CompletedTaskService.create(input),
);

export const readCompletedTaskList = createAsyncThunk(
  'completedTask/readCompletedTaskList',
  async (input: ReadCompletedTaskList) => CompletedTaskService.readList(input),
);

export const deleteCompletedTask = createAsyncThunk(
  'completedTask/deleteCompletedTask',
  async (completedTaskId: string) =>
    CompletedTaskService.delete(completedTaskId),
);

/**
 * Slice
 */
export const completedTaskStore = createSlice({
  name: 'completedTask',
  initialState: completedTaskStoreInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createCompletedTask.pending, state => {
        state.createCompletedTaskStatus = 'pending';
      })
      .addCase(createCompletedTask.fulfilled, (state, action) => {
        state.createCompletedTaskStatus = 'fulfilled';
        completedTaskAdapter.addOne(state, action.payload);
      })
      .addCase(createCompletedTask.rejected, (state, action) => {
        state.createCompletedTaskStatus = 'rejected';
        state.createCompletedTaskError = action.error.message || null;
      })

      .addCase(readCompletedTaskList.pending, state => {
        state.completedTaskListStatus = 'pending';
      })
      .addCase(readCompletedTaskList.fulfilled, (state, action) => {
        state.completedTaskListStatus = 'fulfilled';
        completedTaskAdapter.setAll(state, action.payload.items);
      })
      .addCase(readCompletedTaskList.rejected, (state, action) => {
        state.completedTaskListStatus = 'rejected';
        state.completedTaskListError = action.error.message || null;
      })

      .addCase(deleteCompletedTask.pending, state => {
        state.createCompletedTaskStatus = 'pending';
      })
      .addCase(deleteCompletedTask.fulfilled, (state, action) => {
        state.createCompletedTaskStatus = 'fulfilled';
        completedTaskAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteCompletedTask.rejected, (state, action) => {
        state.createCompletedTaskStatus = 'rejected';
        state.createCompletedTaskError = action.error.message || null;
      });
  },
});

/**
 * Selectors
 */
export const {
  selectAll: selectCompletedTaskList,
  selectById: selectCompletedTask,
} = completedTaskAdapter.getSelectors(
  (state: ReduxStoreRootState) => state.completedTask,
);
