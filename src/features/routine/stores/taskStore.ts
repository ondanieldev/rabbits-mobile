import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { OffsetPaginationQuery } from '../../../shared/interfaces/OffsetPaginationQuery';
import { ReduxStoreRootState } from '../../../shared/stores/reduxStore';
import { Task } from '../interfaces/Task';
import { UpsertTask } from '../interfaces/UpsertTask';
import { TaskService } from '../services/TaskService';

/**
 * State
 */
export interface TaskState {
  ids: EntityState<Task, string>['ids'];
  entities: EntityState<Task, string>['entities'];
  taskListStatus: AsyncStatus;
  taskListError: string | null;
  createTaskStatus: AsyncStatus;
  createTaskError: string | null;
  updateTaskStatus: AsyncStatus;
  updateTaskError: string | null;
  deleteTaskStatus: AsyncStatus;
  deleteTaskError: string | null;
}

/**
 * Adapaters
 */
const taskAdapter = createEntityAdapter({
  sortComparer: (a: Task, b: Task) => {
    if (a.hours !== b.hours) {
      return b.hours - a.hours;
    }
    if (a.minutes !== b.minutes) {
      return b.minutes - a.minutes;
    }
    return a.name.localeCompare(b.name);
  },
});

/**
 * Initial state
 */
export const taskStoreInitialState: TaskState = taskAdapter.getInitialState({
  taskListStatus: 'idle',
  taskListError: null,
  createTaskStatus: 'idle',
  createTaskError: null,
  updateTaskStatus: 'idle',
  updateTaskError: null,
  deleteTaskStatus: 'idle',
  deleteTaskError: null,
});

/**
 * Thunks
 */
export const createTask = createAsyncThunk(
  'task/createTask',
  async (input: UpsertTask) => TaskService.create(input),
);

export const readTaskList = createAsyncThunk(
  'task/readTaskList',
  async (input: OffsetPaginationQuery) => TaskService.readList(input),
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (input: UpsertTask) => TaskService.update(input),
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (taskId: string) => TaskService.delete(taskId),
);

/**
 * Slice
 */
export const taskStore = createSlice({
  name: 'task',
  initialState: taskStoreInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTask.pending, state => {
        state.createTaskStatus = 'pending';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createTaskStatus = 'fulfilled';
        taskAdapter.addOne(state, action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createTaskStatus = 'rejected';
        state.createTaskError = action.error.message || null;
      })

      .addCase(readTaskList.pending, state => {
        state.taskListStatus = 'pending';
      })
      .addCase(readTaskList.fulfilled, (state, action) => {
        state.taskListStatus = 'fulfilled';
        taskAdapter.upsertMany(state, action.payload.items);
      })
      .addCase(readTaskList.rejected, (state, action) => {
        state.taskListStatus = 'rejected';
        state.taskListError = action.error.message || null;
      })

      .addCase(updateTask.pending, state => {
        state.updateTaskStatus = 'pending';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateTaskStatus = 'fulfilled';
        const existing = state.entities[action.payload.id];
        Object.assign(existing, action.payload);
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateTaskStatus = 'rejected';
        state.createTaskError = action.error.message || null;
      })

      .addCase(deleteTask.pending, state => {
        state.createTaskStatus = 'pending';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.createTaskStatus = 'fulfilled';
        taskAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.createTaskStatus = 'rejected';
        state.createTaskError = action.error.message || null;
      });
  },
});

/**
 * Selectors
 */
export const { selectAll: selectTaskList } = taskAdapter.getSelectors(
  (state: ReduxStoreRootState) => state.task,
);
