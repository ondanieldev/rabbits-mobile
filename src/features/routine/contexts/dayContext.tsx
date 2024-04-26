import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { DateUtils } from '../../../shared/utils/DateUtils';
import { useAuth } from '../../auth/contexts/authContext';
import { CompletedTask } from '../interfaces/CompletedTask';
import {
  readCompletedTaskList,
  selectCompletedTaskList,
} from '../stores/completedTaskStore';

/**
 * Interface
 */
export interface DayContext {
  referenceDate: Date;
  setReferenceDate: (date: Date) => void;
  completedTaskList: CompletedTask[];
  completedTaskListStatus: AsyncStatus;
}

/**
 * Context
 */
export const DayContext = createContext<DayContext>({
  referenceDate: new Date(),
  setReferenceDate: () => {},
  completedTaskList: [],
  completedTaskListStatus: 'idle',
});

/**
 * Context provider
 */
export const DayProvider: React.FC<{
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
  const [referenceDate, setReferenceDate] = useState(new Date());
  const completedTaskList = useSelector(selectCompletedTaskList);
  const completedTaskListStatus = useSelector(
    state => state.completedTask.completedTaskListStatus,
  );

  /**
   * Read completed task list on load or auth changing
   */
  useEffect(() => {
    const { year, month, day } = DateUtils.splitDate(referenceDate);
    dispatch(readCompletedTaskList({ limit: 100, page: 1, year, month, day }));
  }, [dispatch, referenceDate, authToken]);

  /**
   * Return
   */
  const value = useMemo(
    () => ({
      referenceDate,
      setReferenceDate,
      completedTaskList,
      completedTaskListStatus,
    }),
    [
      referenceDate,
      setReferenceDate,
      completedTaskList,
      completedTaskListStatus,
    ],
  );

  return <DayContext.Provider value={value}>{children}</DayContext.Provider>;
};

export const useDay = () => {
  return useContext(DayContext);
};
