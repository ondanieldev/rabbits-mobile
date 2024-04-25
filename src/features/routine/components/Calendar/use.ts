import { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';

import { addWeeks, endOfWeek, startOfWeek, subWeeks } from 'date-fns';

import { CalendarPops } from '.';

export type CalendarHook = (props: CalendarPops) => {
  handleNextWeek: () => void;
  handlePrevWeek: () => void;
  scrollViewRef: React.RefObject<ScrollView>;
};

export const useCalendar: CalendarHook = ({
  referenceDate,
  setReferenceDate,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNextWeek = useCallback(() => {
    setReferenceDate(startOfWeek(addWeeks(referenceDate, 1)));
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  }, [referenceDate, setReferenceDate]);

  const handlePrevWeek = useCallback(() => {
    setReferenceDate(endOfWeek(subWeeks(referenceDate, 1)));
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [referenceDate, setReferenceDate]);

  return {
    handleNextWeek,
    handlePrevWeek,
    scrollViewRef,
  };
};
