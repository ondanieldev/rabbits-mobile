import { AuthProvider } from '../../features/auth/contexts/authContext';
import { AppointmentProvider } from '../../features/routine/contexts/appointmentContext';
import { DayProvider } from '../../features/routine/contexts/dayContext';
import { TaskProvider } from '../../features/routine/contexts/taskContext';

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppointmentProvider>
          <DayProvider>{children}</DayProvider>
        </AppointmentProvider>
      </TaskProvider>
    </AuthProvider>
  );
};
