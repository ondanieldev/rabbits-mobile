import { DateUtils } from '../../../../shared/utils/DateUtils';
import { CreateTask } from '../../interfaces/CreateTask';
import { Task } from '../../interfaces/Task';
import { CreateHabitSchema } from '../../schemas/createHabitSchema';

export const initialValues: CreateHabitSchema = {
  name: '',
  daysOfWeek: [] as unknown as [number, ...number[]],
  time: new Date(),
  isNotificationEnabled: false,
  isSoundEnabled: false,
  isVibrationEnabled: false,
};

export const getInitialValues = (editingHabit: Task): CreateHabitSchema => ({
  name: editingHabit.name,
  daysOfWeek: editingHabit.daysOfWeek as unknown as [number, ...number[]],
  time: DateUtils.buildDate({
    hour: editingHabit.hours,
    minute: editingHabit.minutes,
  }),
  isNotificationEnabled: editingHabit.isNotificationEnabled,
  isSoundEnabled: editingHabit.isSoundEnabled,
  isVibrationEnabled: editingHabit.isVibrationEnabled,
});

export const transformData = ({
  time,
  isNotificationEnabled,
  isSoundEnabled,
  isVibrationEnabled,
  ...data
}: CreateHabitSchema): CreateTask => ({
  hours: time.getHours(),
  minutes: time.getMinutes(),
  kind: 'habit',
  isNotificationEnabled,
  isSoundEnabled: isNotificationEnabled && isSoundEnabled,
  isVibrationEnabled: isNotificationEnabled && isVibrationEnabled,
  ...data,
});
