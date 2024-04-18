import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { format, isSameDay } from 'date-fns';

import { CalendarDayProps } from '.';
import { calendarDayStyles } from './styles';

type Styles = {
  dayOfWeek: StyleProp<TextStyle>;
  day: StyleProp<TextStyle>;
};

export type CalendarDayHook = (data: CalendarDayProps) => {
  day: string;
  dayOfWeek: string;
  isSelected: boolean;
  styles: Styles;
};

export const useCalendarDay: CalendarDayHook = ({ date, referenceDate }) => {
  const { t } = useTranslation('common');

  const day = useMemo(() => format(date, 'dd'), [date]);
  const dayOfWeek = useMemo(() => t(format(date, 'EEE')), [date, t]);

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
      container: calendarDayStyles.container,
      dayOfWeek: calendarDayStyles.dayOfWeek,
      day: calendarDayStyles.day,
    };
  }, [isSelected]);

  return {
    styles,
    day,
    dayOfWeek,
    isSelected,
  };
};
