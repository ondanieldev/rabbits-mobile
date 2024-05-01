import { createContext, useContext, useEffect } from 'react';

import { User } from '../../../shared/interfaces/User';
import { useProfile } from '../../profile/contexts/profileContext';
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
   * Profile setup
   */
  const { profile } = useProfile();

  /**
   * Appointment setup
   */
  const { appointmentList } = useAppointment();

  /**
   * Whenever the list changes, update appointment notification list
   */
  useEffect(() => {
    async function bootstrap(user: User) {
      const newIdList = await AppointmentNotificationService.upsertList(
        user,
        appointmentList,
      );
      await AppointmentNotificationService.deleteDanglingList(newIdList);
    }

    if (profile) {
      bootstrap(profile);
    }
  }, [appointmentList, profile]);

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
