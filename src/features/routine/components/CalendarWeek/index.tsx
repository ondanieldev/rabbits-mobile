import { ScrollView } from 'react-native';

import { calendarWeekStyles } from './styles';
import { useCalendarWeek } from './use';

export interface CalendarWeekProps {
  referenceDate: Date;
  setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
  scrollViewRef: React.RefObject<ScrollView>;
}

export const CalendarWeek: React.FC<CalendarWeekProps> = props => {
  const { CalendarDays } = useCalendarWeek(props);

  return (
    <ScrollView
      ref={props.scrollViewRef}
      contentContainerStyle={calendarWeekStyles.container}
      horizontal={true}
      alwaysBounceHorizontal={false}>
      {CalendarDays}
    </ScrollView>
  );
};
