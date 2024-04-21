import { AppointmentProvider } from '../../features/routine/contexts/appointmentContext';
import { TaskProvider } from '../../features/routine/contexts/taskContext';

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <TaskProvider>
      <AppointmentProvider>{children}</AppointmentProvider>
    </TaskProvider>
  );
};
