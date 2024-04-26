import { useMemo } from 'react';

import { ItemData } from '../../interfaces/ItemData';

export type RoutineMainViewProgressBarHook = ({}: {
  itemList: ItemData[];
  reminderList: ItemData[];
}) => {
  completedCount: number;
  totalCount: number;
};

export const useRoutineMainViewProgressBar: RoutineMainViewProgressBarHook = ({
  itemList,
  reminderList,
}) => {
  const totalCount = useMemo(
    () => itemList.length + reminderList.length,
    [itemList, reminderList],
  );

  const completedCount = useMemo(
    () =>
      itemList.filter(item => item.isCompleted).length +
      reminderList.filter(item => item.isCompleted).length,
    [itemList, reminderList],
  );

  return {
    completedCount,
    totalCount,
  };
};
