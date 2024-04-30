import { createContext, useContext, useEffect } from 'react';

import { useAppointment } from '../../routine/contexts/appointmentContext';
import { AppointmentNotificationService } from '../services/AppointmentNotificationService';

/**
 * Context
 */
export const AppointmentNotificationContext = createContext({});

/**
 * Context provider
 */
export const AppointmentNotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * Appointment setup
   */
  const { appointmentList } = useAppointment();

  /**
   * Whenever the list changes, update appointment notification list
   */
  useEffect(() => {
    async function bootstrap() {
      const newIdList = await AppointmentNotificationService.upsertList(
        appointmentList,
      );
      await AppointmentNotificationService.deleteDanglingList(newIdList);
    }

    bootstrap();
  }, [appointmentList]);

  return (
    <AppointmentNotificationContext.Provider value={{}}>
      {children}
    </AppointmentNotificationContext.Provider>
  );
};

/**
 * Context hook
 */
export const useAppointmentNotification = () => {
  return useContext(AppointmentNotificationContext);
};
