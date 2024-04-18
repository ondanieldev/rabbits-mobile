import { useMemo } from 'react';

import { RoutineScreenProps } from '.';
import { ItemData } from '../../interfaces/ItemData';
import { appointmentList, completedTaskList, taskList } from './data';

export type RoutineScreenHook = (
  params: Pick<RoutineScreenProps, 'referenceDate'>,
) => {
  reminderList: ItemData[];
  itemDataList: ItemData[];
};

export const useRoutineScreen: RoutineScreenHook = ({ referenceDate }) => {
  const reminderList = useMemo<ItemData[]>(
    () =>
      taskList
        .filter(task => task.kind === 'reminder')
        .map(task => ({
          id: task.id,
          name: task.name,
          isCompleted: !!completedTaskList.find(
            completedTask => completedTask.taskId === task.id,
          ),
          objectType: 'task',
          daysOfWeek: task.daysOfWeek,
          kind: task.kind,
        })),
    [],
  );

  const taskListData = useMemo<ItemData[]>(
    () =>
      taskList
        .filter(task => task.kind === 'habit')
        .map(task => {
          const date = new Date(referenceDate);
          date.setHours(task.hours);
          date.setMinutes(task.minutes);
          return {
            id: task.id,
            name: task.name,
            isCompleted: !!completedTaskList.find(
              completedTask => completedTask.taskId === task.id,
            ),
            objectType: 'task',
            date,
            daysOfWeek: task.daysOfWeek,
            kind: task.kind,
            showTime: true,
          };
        }),
    [referenceDate],
  );

  const appointmentListData = useMemo<ItemData[]>(
    () =>
      appointmentList.map(appointment => ({
        id: appointment.id,
        name: appointment.name,
        objectType: 'appointment',
        isCompleted: appointment.isCompleted,
        date: appointment.date,
        showTime: true,
      })),
    [],
  );

  const itemDataList = useMemo<ItemData[]>(() => {
    const data: ItemData[] = taskListData.concat(appointmentListData);

    data.sort((a, b) => {
      if (!a.date && !b.date) {
        return 0;
      }
      if (!a.date) {
        return 1;
      }
      if (!b.date) {
        return -1;
      }
      return a.date.getTime() - b.date.getTime();
    });

    return data;
  }, [appointmentListData, taskListData]);

  return {
    reminderList,
    itemDataList,
  };
};
