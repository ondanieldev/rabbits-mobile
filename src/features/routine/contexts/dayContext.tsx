import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { CompletedTask } from '../interfaces/CompletedTask';
import {
  readCompletedTaskList,
  selectCompletedTaskList,
} from '../stores/completedTaskStore';

export interface DayContext {
  referenceDate: Date;
  setReferenceDate: (date: Date) => void;
  completedTaskList: CompletedTask[];
  completedTaskListStatus: AsyncStatus;
}

export const DayContext = createContext<DayContext>({
  referenceDate: new Date(),
  setReferenceDate: () => {},
  completedTaskList: [],
  completedTaskListStatus: 'idle',
});

export const DayProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Redux
   */
  const dispatch = useDispatch();

  /**
   * Reference date
   */
  const [referenceDate, setReferenceDate] = useState(new Date());

  /**
   * Load completed task list
   */
  const completedTaskList = useSelector(selectCompletedTaskList);

  const completedTaskListStatus = useSelector(
    state => state.completedTask.completedTaskListStatus,
  );

  useEffect(() => {
    if (completedTaskListStatus === 'idle') {
      const year = referenceDate.getFullYear();
      const month = referenceDate.getMonth() + 1;
      const day = referenceDate.getDate();
      dispatch(
        readCompletedTaskList({ limit: 100, page: 1, year, month, day }),
      );
    }
  }, [dispatch, completedTaskListStatus, referenceDate]);

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
