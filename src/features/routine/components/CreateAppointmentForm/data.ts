import { Appointment } from '../../interfaces/Appointment';
import { CreateAppointment } from '../../interfaces/CreateAppointment';
import { CreateAppointmentSchema } from '../../schemas/createAppointmentSchema';

const buildDate = (date: Date, time: Date) => {
  const newDate = new Date(date);
  newDate.setHours(time.getHours());
  newDate.setMinutes(time.getMinutes());
  return newDate;
};

export const initialValues: CreateAppointmentSchema = {
  name: '',
  date: new Date(),
  time: new Date(),
  isNotificationEnabled: false,
  isSoundEnabled: false,
  isVibrationEnabled: false,
};

export const getInitialValues = (
  editingAppointment: Appointment,
): CreateAppointmentSchema => ({
  name: editingAppointment.name,
  date: new Date(editingAppointment.date),
  time: new Date(editingAppointment.date),
  isNotificationEnabled: editingAppointment.isNotificationEnabled,
  isSoundEnabled: editingAppointment.isSoundEnabled,
  isVibrationEnabled: editingAppointment.isVibrationEnabled,
});

export const transformData = ({
  date,
  time,
  isNotificationEnabled,
  isSoundEnabled,
  isVibrationEnabled,
  ...data
}: CreateAppointmentSchema): CreateAppointment => ({
  date: buildDate(date, time),
  isNotificationEnabled,
  isSoundEnabled: isNotificationEnabled && isSoundEnabled,
  isVibrationEnabled: isNotificationEnabled && isVibrationEnabled,
  ...data,
});
