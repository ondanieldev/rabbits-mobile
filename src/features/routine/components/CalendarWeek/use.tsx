import { useMemo } from 'react';

import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';

import { CalendarWeekProps } from '.';
import { CalendarDay } from '../CalendarDay';

export type CalendarWeekHook = (data: CalendarWeekProps) => {
  CalendarDays: JSX.Element[];
};

export const useCalendarWeek: CalendarWeekHook = ({
  referenceDate,
  setReferenceDate,
}) => {
  const CalendarDays = useMemo<JSX.Element[]>(() => {
    const weekDays = eachDayOfInterval({
      start: startOfWeek(referenceDate),
      end: endOfWeek(referenceDate),
    });

    return weekDays.map(date => (
      <CalendarDay
        setReferenceDate={setReferenceDate}
        key={date.toString()}
        date={date}
        referenceDate={referenceDate}
      />
    ));
  }, [referenceDate, setReferenceDate]);

  return {
    CalendarDays,
  };
};
