import { User } from '../../../../shared/interfaces/User';
import { Appointment } from '../../interfaces/Appointment';
import { CreateAppointment } from '../../interfaces/CreateAppointment';
import { CreateAppointmentSchema } from '../../schemas/createAppointmentSchema';

const buildDate = (date: Date, time: Date) => {
  const newDate = new Date(date);
  newDate.setHours(time.getHours());
  newDate.setMinutes(time.getMinutes());
  return newDate;
};

export const getInitialValues = ({
  editingAppointment,
  profile,
}: {
  editingAppointment?: Appointment;
  profile?: User | null;
}): CreateAppointmentSchema => {
  const baseValue: CreateAppointmentSchema = {
    name: '',
    date: new Date(),
    time: new Date(),
    isNotificationEnabled: false,
    isSoundEnabled: false,
    isVibrationEnabled: false,
  };
  if (editingAppointment) {
    return {
      name: editingAppointment.name,
      date: new Date(editingAppointment.date),
      time: new Date(editingAppointment.date),
      isNotificationEnabled: editingAppointment.isNotificationEnabled,
      isSoundEnabled: editingAppointment.isSoundEnabled,
      isVibrationEnabled: editingAppointment.isVibrationEnabled,
    };
  }

  if (profile) {
    return {
      ...baseValue,
      isNotificationEnabled: profile.isNotificationEnabled,
      isSoundEnabled: profile.isSoundEnabled,
      isVibrationEnabled: profile.isVibrationEnabled,
    };
  }

  return baseValue;
};

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
