import { createContext, useContext, useEffect, useMemo } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { useAuth } from '../../auth/contexts/authContext';
import { Task } from '../interfaces/Task';
import { readTaskList, selectTaskList } from '../stores/taskStore';

/**
 * Interface
 */
export interface TaskContext {
  taskList: Task[];
  taskListStatus: AsyncStatus;
}

/**
 * Context
 */
export const TaskContext = createContext<TaskContext>({
  taskList: [],
  taskListStatus: 'idle',
});

/**
 * Context provider
 */
export const TaskProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Auth setup
   */
  const { authToken } = useAuth();

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * State to be distributed
   */
  const taskList = useSelector(selectTaskList);
  const taskListStatus = useSelector(state => state.task.taskListStatus);

  /**
   * Read task list on load or auth changing
   */
  useEffect(() => {
    dispatch(readTaskList({ limit: 100, page: 1 }));
  }, [dispatch, authToken]);

  /**
   * Return
   */
  const value = useMemo(
    () => ({
      taskList,
      taskListStatus,
    }),
    [taskList, taskListStatus],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

/**
 * Context hook
 */
export const useTask = () => {
  return useContext(TaskContext);
};
