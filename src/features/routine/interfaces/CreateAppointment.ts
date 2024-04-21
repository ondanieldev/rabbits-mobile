import { Appointment } from './Appointment';

export type CreateAppointment = Pick<Appointment, 'name'> & {
  date: Date;
};
