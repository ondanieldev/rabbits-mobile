import { AppointmentProvider } from '../../features/routine/contexts/appointmentContext';
import { DayProvider } from '../../features/routine/contexts/dayContext';
import { TaskProvider } from '../../features/routine/contexts/taskContext';

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <TaskProvider>
      <AppointmentProvider>
        <DayProvider>{children}</DayProvider>
      </AppointmentProvider>
    </TaskProvider>
  );
};
