import { useCallback, useMemo, useState } from 'react';

import { ReminderListProps } from '.';
import { ItemData } from '../../interfaces/ItemData';

export type ReminderListHook = (props: ReminderListProps) => {
  currentReminder: ItemData;
  hasNextReminder: boolean;
  hasPrevReminder: boolean;
  handleNextReminder: () => void;
  handlePrevReminder: () => void;
};

export const useReminderList: ReminderListHook = ({ reminderList }) => {
  const [reminderIndex, setReminderIndex] = useState(0);

  const hasNextReminder = useMemo(
    () => reminderIndex < reminderList.length - 1,
    [reminderIndex, reminderList],
  );

  const hasPrevReminder = useMemo(() => reminderIndex > 0, [reminderIndex]);

  const handleNextReminder = useCallback(() => {
    if (hasNextReminder) {
      setReminderIndex(reminderIndex + 1);
    }
  }, [hasNextReminder, reminderIndex]);

  const handlePrevReminder = useCallback(() => {
    if (hasPrevReminder) {
      setReminderIndex(reminderIndex - 1);
    }
  }, [hasPrevReminder, reminderIndex]);

  const currentReminder = useMemo(
    () => reminderList[reminderIndex],
    [reminderIndex, reminderList],
  );

  return {
    currentReminder,
    hasNextReminder,
    hasPrevReminder,
    handleNextReminder,
    handlePrevReminder,
  };
};
