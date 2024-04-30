import { AuthProvider } from '../../features/auth/contexts/authContext';
import { NotificationProvider } from '../../features/notification/contexts/notificationContext';
import { AppointmentProvider } from '../../features/routine/contexts/appointmentContext';
import { DayProvider } from '../../features/routine/contexts/dayContext';
import { TaskProvider } from '../../features/routine/contexts/taskContext';

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <TaskProvider>
          <AppointmentProvider>
            <DayProvider>{children}</DayProvider>
          </AppointmentProvider>
        </TaskProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};
