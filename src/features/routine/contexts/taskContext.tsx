import { createContext, useContext, useEffect, useMemo } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { useAuth } from '../../auth/contexts/authContext';
import { Task } from '../interfaces/Task';
import { readTaskList, selectTaskList } from '../stores/taskStore';

export interface TaskContext {
  taskList: Task[];
  taskListStatus: AsyncStatus;
}

export const TaskContext = createContext<TaskContext>({
  taskList: [],
  taskListStatus: 'idle',
});

export const TaskProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { authToken } = useAuth();

  const dispatch = useDispatch();

  const taskList = useSelector(selectTaskList);

  const taskListStatus = useSelector(state => state.task.taskListStatus);

  useEffect(() => {
    dispatch(readTaskList({ limit: 100, page: 1 }));
  }, [dispatch, authToken]);

  const value = useMemo(
    () => ({
      taskList,
      taskListStatus,
    }),
    [taskList, taskListStatus],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  return useContext(TaskContext);
};
