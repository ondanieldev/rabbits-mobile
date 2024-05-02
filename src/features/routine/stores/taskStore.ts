import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { OffsetPaginationQuery } from '../../../shared/interfaces/OffsetPaginationQuery';
import { ReduxStoreRootState } from '../../../shared/stores/reduxStore';
import { CreateTask } from '../interfaces/CreateTask';
import { Task } from '../interfaces/Task';
import { UpdateTask } from '../interfaces/UpdateTask';
import { TaskService } from '../services/TaskService';
import { TaskUtils } from '../utils/TaskUtils';

/**
 * State
 */
export interface TaskState {
  ids: EntityState<Task, string>['ids'];
  entities: EntityState<Task, string>['entities'];
  changingTaskIds: string[];
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
  sortComparer: TaskUtils.sortComparer,
});

/**
 * Initial state
 */
export const taskStoreInitialState: TaskState = taskAdapter.getInitialState({
  changingTaskIds: [],
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
  async (input: CreateTask) => TaskService.create(input),
);

export const readTaskList = createAsyncThunk(
  'task/readTaskList',
  async (input: OffsetPaginationQuery) => TaskService.readList(input),
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (input: UpdateTask) => TaskService.update(input),
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
        taskAdapter.setAll(state, action.payload.items);
      })
      .addCase(readTaskList.rejected, (state, action) => {
        state.taskListStatus = 'rejected';
        state.taskListError = action.error.message || null;
      })

      .addCase(updateTask.pending, (state, action) => {
        state.updateTaskStatus = 'pending';
        state.changingTaskIds.push(action.meta.arg.id);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateTaskStatus = 'fulfilled';
        const { id, ...changes } = action.payload;
        taskAdapter.updateOne(state, { id, changes });
        state.changingTaskIds = state.changingTaskIds.filter(
          changingId => changingId !== id,
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateTaskStatus = 'rejected';
        state.createTaskError = action.error.message || null;
        state.changingTaskIds = state.changingTaskIds.filter(
          changingId => changingId !== action.meta.arg.id,
        );
      })

      .addCase(deleteTask.pending, (state, action) => {
        state.deleteTaskStatus = 'pending';
        state.changingTaskIds.push(action.meta.arg);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteTaskStatus = 'fulfilled';
        taskAdapter.removeOne(state, action.payload);
        state.changingTaskIds = state.changingTaskIds.filter(
          changingId => changingId !== action.payload,
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteTaskStatus = 'rejected';
        state.createTaskError = action.error.message || null;
        state.changingTaskIds = state.changingTaskIds.filter(
          changingId => changingId !== action.meta.arg,
        );
      });
  },
});

/**
 * Selectors
 */
export const { selectAll: selectTaskList, selectById: selectTask } =
  taskAdapter.getSelectors((state: ReduxStoreRootState) => state.task);
