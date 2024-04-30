import { AuthProvider } from '../../features/auth/contexts/authContext';
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
        <TaskProvider>
          <AppointmentProvider>
            <DayProvider>{children}</DayProvider>
          </AppointmentProvider>
        </TaskProvider>
      </AuthProvider>
    </ToastProvider>
  );
};
