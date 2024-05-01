import { createContext, useContext, useEffect } from 'react';

import { isToday } from 'date-fns';

import { User } from '../../../shared/interfaces/User';
import { TaskNotificationService } from '../../notification/services/TaskNotificationService';
import { useProfile } from '../../profile/contexts/profileContext';
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
   * Profile setup
   */
  const { profile } = useProfile();

  /**
   * Task setup
   */
  const { taskList } = useTask();
  const { completedTaskList, referenceDate } = useDay();

  /**
   * Whenever the list changes, update task notification list for today
   */
  useEffect(() => {
    async function bootstrap(user: User) {
      const newIdList = await TaskNotificationService.upsertList(
        user,
        taskList,
        completedTaskList,
      );
      await TaskNotificationService.deleteDanglingList(newIdList);
    }

    if (profile && isToday(referenceDate)) {
      bootstrap(profile);
    }
  }, [profile, referenceDate, taskList, completedTaskList]);

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
