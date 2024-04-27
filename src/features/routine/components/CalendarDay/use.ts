import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { isSameDay } from 'date-fns';

import { CalendarDayProps, CalendarDayStyles } from '.';
import { calendarDayStyles } from './styles';

export const useCalendarDay = ({
  date,
  referenceDate,
  setReferenceDate,
  styles: propStyles,
}: CalendarDayProps) => {
  const isSelected = useMemo(
    () => isSameDay(date, referenceDate),
    [date, referenceDate],
  );

  const styles = useMemo<CalendarDayStyles>(() => {
    const baseStyles: CalendarDayStyles = {
      container: StyleSheet.compose(
        calendarDayStyles.container,
        propStyles?.container,
      ),
      dayOfWeek: StyleSheet.compose(
        calendarDayStyles.dayOfWeek,
        propStyles?.dayOfWeek,
      ),
      day: StyleSheet.compose(calendarDayStyles.day, propStyles?.day),
    };

    if (isSelected) {
      return {
        container: baseStyles.container,
        dayOfWeek: StyleSheet.compose(
          baseStyles.dayOfWeek,
          calendarDayStyles.textSelected,
        ),
        day: StyleSheet.compose(baseStyles.day, calendarDayStyles.textSelected),
      };
    }

    return baseStyles;
  }, [isSelected, propStyles]);

  const onPress = useCallback(() => {
    setReferenceDate(date);
  }, [setReferenceDate, date]);

  return {
    styles,
    isSelected,
    onPress,
  };
};
