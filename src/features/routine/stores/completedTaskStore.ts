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
  changingRelatedTaskIds: string[];
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
    changingRelatedTaskIds: [],
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
      .addCase(createCompletedTask.pending, (state, action) => {
        state.createCompletedTaskStatus = 'pending';
        state.changingRelatedTaskIds.push(action.meta.arg.taskId);
      })
      .addCase(createCompletedTask.fulfilled, (state, action) => {
        state.createCompletedTaskStatus = 'fulfilled';
        completedTaskAdapter.addOne(state, action.payload);
        state.changingRelatedTaskIds = state.changingRelatedTaskIds.filter(
          id => id !== action.payload.taskId,
        );
      })
      .addCase(createCompletedTask.rejected, (state, action) => {
        state.createCompletedTaskStatus = 'rejected';
        state.createCompletedTaskError = action.error.message || null;
        state.changingRelatedTaskIds = state.changingRelatedTaskIds.filter(
          id => id !== action.meta.arg.taskId,
        );
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

      .addCase(deleteCompletedTask.pending, (state, action) => {
        state.deleteCompletedTaskStatus = 'pending';
        const completedTask = state.entities[action.meta.arg];
        if (completedTask) {
          state.changingRelatedTaskIds.push(completedTask.taskId);
        }
      })
      .addCase(deleteCompletedTask.fulfilled, (state, action) => {
        state.deleteCompletedTaskStatus = 'fulfilled';
        const completedTask = state.entities[action.payload];
        if (completedTask) {
          state.changingRelatedTaskIds = state.changingRelatedTaskIds.filter(
            id => id !== completedTask.taskId,
          );
        }
        completedTaskAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteCompletedTask.rejected, (state, action) => {
        state.deleteCompletedTaskStatus = 'rejected';
        state.createCompletedTaskError = action.error.message || null;
        const completedTask = state.entities[action.meta.arg];
        if (completedTask) {
          state.changingRelatedTaskIds = state.changingRelatedTaskIds.filter(
            id => id !== completedTask.taskId,
          );
        }
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
