import { useCallback, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { isSameDay } from 'date-fns';

import { CalendarDayProps } from '.';
import { calendarDayStyles } from './styles';

type Styles = {
  dayOfWeek: StyleProp<TextStyle>;
  day: StyleProp<TextStyle>;
};

export const useCalendarDay = ({
  date,
  referenceDate,
  setReferenceDate,
}: CalendarDayProps) => {
  const isSelected = useMemo(
    () => isSameDay(date, referenceDate),
    [date, referenceDate],
  );

  const styles = useMemo<Styles>(() => {
    if (isSelected) {
      return {
        dayOfWeek: StyleSheet.compose(
          calendarDayStyles.dayOfWeek,
          calendarDayStyles.textSelected,
        ),
        day: StyleSheet.compose(
          calendarDayStyles.day,
          calendarDayStyles.textSelected,
        ),
      };
    }
    return {
      dayOfWeek: calendarDayStyles.dayOfWeek,
      day: calendarDayStyles.day,
    };
  }, [isSelected]);

  const onPress = useCallback(() => {
    setReferenceDate(date);
  }, [setReferenceDate, date]);

  return {
    styles,
    isSelected,
    onPress,
  };
};
