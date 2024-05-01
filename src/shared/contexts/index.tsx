import { AuthProvider } from '../../features/auth/contexts/authContext';
import { AppointmentNotificationProvider } from '../../features/notification/contexts/AppointmentNotificationContext';
import { TaskNotificationProvider } from '../../features/notification/contexts/TaskNotificationContext';
import { ProfileProvider } from '../../features/profile/contexts/profileContext';
import { AppointmentProvider } from '../../features/routine/contexts/appointmentContext';
import { DayProvider } from '../../features/routine/contexts/dayContext';
import { TaskProvider } from '../../features/routine/contexts/taskContext';
import { ToastProvider } from '../../features/toast/contexts/toastContext';

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProfileProvider>
          <TaskProvider>
            <AppointmentProvider>
              <DayProvider>
                <TaskNotificationProvider>
                  <AppointmentNotificationProvider>
                    {children}
                  </AppointmentNotificationProvider>
                </TaskNotificationProvider>
              </DayProvider>
            </AppointmentProvider>
          </TaskProvider>
        </ProfileProvider>
      </AuthProvider>
    </ToastProvider>
  );
};
