import { User } from '../../../../shared/interfaces/User';
import { DateUtils } from '../../../../shared/utils/DateUtils';
import { CreateTask } from '../../interfaces/CreateTask';
import { Task } from '../../interfaces/Task';
import { CreateHabitSchema } from '../../schemas/createHabitSchema';

export const getInitialValues = ({
  editingHabit,
  profile,
}: {
  editingHabit?: Task;
  profile?: User | null;
}): CreateHabitSchema => {
  const baseValue: CreateHabitSchema = {
    name: '',
    daysOfWeek: [] as unknown as [number, ...number[]],
    time: new Date(),
  };
  if (editingHabit) {
    return {
      name: editingHabit.name,
      daysOfWeek: editingHabit.daysOfWeek as unknown as [number, ...number[]],
      time: DateUtils.buildDate({
        hour: editingHabit.hours,
        minute: editingHabit.minutes,
      }),
    };
  }
  return baseValue;
};

export const transformData = ({
  time,
  ...data
}: CreateHabitSchema): CreateTask => ({
  hours: time.getHours(),
  minutes: time.getMinutes(),
  kind: 'habit',
  ...data,
});
