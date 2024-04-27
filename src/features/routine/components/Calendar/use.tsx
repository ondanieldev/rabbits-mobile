import { useCallback, useMemo, useRef } from 'react';
import { ScrollView } from 'react-native';

import {
  addWeeks,
  endOfWeek,
  isSameWeek,
  startOfWeek,
  subWeeks,
} from 'date-fns';

import { CalendarPops } from '.';

export const calendarDayOffset = 1;

export const useCalendar = ({
  referenceDate,
  setReferenceDate,
}: CalendarPops) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNextWeek = useCallback(() => {
    setReferenceDate(startOfWeek(addWeeks(referenceDate, calendarDayOffset)));
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  }, [referenceDate, setReferenceDate]);

  const handlePrevWeek = useCallback(() => {
    setReferenceDate(endOfWeek(subWeeks(referenceDate, calendarDayOffset)));
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [referenceDate, setReferenceDate]);

  const showGoToToday = useMemo<'never' | 'before' | 'after'>(() => {
    if (isSameWeek(referenceDate, new Date())) {
      return 'never';
    }
    return new Date().getTime() > referenceDate.getTime() ? 'after' : 'before';
  }, [referenceDate]);

  return {
    handleNextWeek,
    handlePrevWeek,
    scrollViewRef,
    showGoToToday,
  };
};
