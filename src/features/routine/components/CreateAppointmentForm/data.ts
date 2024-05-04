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
  };
  if (editingAppointment) {
    return {
      name: editingAppointment.name,
      date: new Date(editingAppointment.date),
      time: new Date(editingAppointment.date),
    };
  }
  return baseValue;
};

export const transformData = ({
  date,
  time,
  ...data
}: CreateAppointmentSchema): CreateAppointment => ({
  date: buildDate(date, time),
  ...data,
});
