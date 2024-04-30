import { createContext, useContext, useEffect } from 'react';

import { isToday } from 'date-fns';

import { TaskNotificationService } from '../../notification/services/TaskNotificationService';
import { useDay } from '../../routine/contexts/dayContext';
import { useTask } from '../../routine/contexts/taskContext';

/**
 * Context
 */
export const TaskNotificationContext = createContext({});

/**
 * Context provider
 */
export const TaskNotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Task setup
   */
  const { taskList } = useTask();
  const { completedTaskList, referenceDate } = useDay();

  /**
   * Whenever the list changes, update task notification list for today
   */
  useEffect(() => {
    async function bootstrap() {
      const newIdList = await TaskNotificationService.upsertList(
        taskList,
        completedTaskList,
      );
      await TaskNotificationService.deleteDanglingList(newIdList);
    }

    if (isToday(referenceDate)) {
      bootstrap();
    }
  }, [referenceDate, taskList, completedTaskList]);

  return (
    <TaskNotificationContext.Provider value={{}}>
      {children}
    </TaskNotificationContext.Provider>
  );
};

/**
 * Context hook
 */
export const useTaskNotification = () => {
  return useContext(TaskNotificationContext);
};
