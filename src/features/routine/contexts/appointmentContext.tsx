import { createContext, useContext, useEffect, useMemo } from 'react';

import { AsyncStatus } from '../../../shared/enums/AsyncStatus';
import { useDispatch } from '../../../shared/hooks/useDispatch';
import { useSelector } from '../../../shared/hooks/useSelector';
import { Appointment } from '../interfaces/Appointment';
import {
  readAppointmentList,
  selectAppointmentList,
} from '../stores/appointmentStore';

export interface AppointmentContext {
  appointmentList: Appointment[];
  appointmentListStatus: AsyncStatus;
}

export const AppointmentContext = createContext<AppointmentContext>({
  appointmentList: [],
  appointmentListStatus: 'idle',
});

export const AppointmentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useDispatch();

  const appointmentList = useSelector(selectAppointmentList);

  const appointmentListStatus = useSelector(
    state => state.appointment.appointmentListStatus,
  );

  useEffect(() => {
    if (appointmentListStatus === 'idle') {
      dispatch(readAppointmentList({ limit: 100, page: 1 }));
    }
  }, [dispatch, appointmentListStatus]);

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

export const useAppointment = () => {
  return useContext(AppointmentContext);
};
