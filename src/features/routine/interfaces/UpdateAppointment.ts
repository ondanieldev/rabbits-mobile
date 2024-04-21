import { CreateAppointment } from './CreateAppointment';

export type UpdateAppointment = CreateAppointment & {
  id: string;
  isCompleted: boolean;
};
