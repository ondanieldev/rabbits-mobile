import { Appointment } from './Appointment';

export type CreateAppointment = Pick<
  Appointment,
  'name' | 'isNotificationEnabled' | 'isSoundEnabled' | 'isVibrationEnabled'
> & {
  date: Date;
};
