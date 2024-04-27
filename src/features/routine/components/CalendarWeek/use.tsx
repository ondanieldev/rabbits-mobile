import { useMemo } from 'react';

import { eachDayOfInterval, endOfWeek, isSameDay, startOfWeek } from 'date-fns';

import { CalendarWeekProps } from '.';
import { CalendarDay } from '../CalendarDay';
import { calendarWeekStyles } from './styles';

export type CalendarWeekHook = (data: CalendarWeekProps) => {
  CalendarDays: JSX.Element[];
};

export const useCalendarWeek: CalendarWeekHook = ({
  referenceDate,
  setReferenceDate,
}) => {
  const CalendarDays = useMemo<JSX.Element[]>(() => {
    const today = new Date();

    const weekDays = eachDayOfInterval({
      start: startOfWeek(referenceDate),
      end: endOfWeek(referenceDate),
    });

    return weekDays.map(date => {
      return (
        <CalendarDay
          setReferenceDate={setReferenceDate}
          key={date.toString()}
          date={date}
          referenceDate={referenceDate}
          styles={
            isSameDay(date, today)
              ? {
                  container: calendarWeekStyles.containerToday,
                  day: calendarWeekStyles.dayToday,
                  dayOfWeek: calendarWeekStyles.dayOfWeekToday,
                }
              : undefined
          }
        />
      );
    });
  }, [referenceDate, setReferenceDate]);

  return {
    CalendarDays,
  };
};
