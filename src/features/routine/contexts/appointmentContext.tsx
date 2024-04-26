import { createContext, useContext, useEffect, useMemo } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { useAuth } from '../../auth/contexts/authContext';
import { Appointment } from '../interfaces/Appointment';
import {
  readAppointmentList,
  selectAppointmentList,
} from '../stores/appointmentStore';

/**
 * Interface
 */
export interface AppointmentContext {
  appointmentList: Appointment[];
  appointmentListStatus: AsyncStatus;
}

/**
 * Context
 */
export const AppointmentContext = createContext<AppointmentContext>({
  appointmentList: [],
  appointmentListStatus: 'idle',
});

/**
 * Context provider
 */
export const AppointmentProvider: React.FC<{
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
  const appointmentList = useSelector(selectAppointmentList);

  const appointmentListStatus = useSelector(
    state => state.appointment.appointmentListStatus,
  );

  /**
   * Read appointment list on load or auth changing
   */
  useEffect(() => {
    dispatch(readAppointmentList({ limit: 100, page: 1 }));
  }, [dispatch, authToken]);

  /**
   * Return
   */
  const value = useMemo(
    () => ({
      appointmentList,
      appointmentListStatus,
    }),
    [appointmentList, appointmentListStatus],
  );

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

/**
 * Context hook
 */
export const useAppointment = () => {
  return useContext(AppointmentContext);
};
