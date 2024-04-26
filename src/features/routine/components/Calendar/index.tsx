import { View } from 'react-native';

import { IconButton } from '../../../../shared/components/IconButton';
import { CalendarWeek } from '../CalendarWeek';
import { calendarStyles } from './calendarStyles';
import { calendarIconProps } from './data';
import { useCalendar } from './use';

export interface CalendarPops {
  referenceDate: Date;
  setReferenceDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarPops> = ({
  referenceDate,
  setReferenceDate,
}) => {
  const { handleNextWeek, handlePrevWeek, scrollViewRef } = useCalendar({
    referenceDate,
    setReferenceDate,
  });

  return (
    <View style={calendarStyles.container}>
      <IconButton
        iconProps={calendarIconProps.prev}
        buttonProps={{
          onPress: handlePrevWeek,
        }}
      />

      <CalendarWeek
        scrollViewRef={scrollViewRef}
        referenceDate={referenceDate}
        setReferenceDate={setReferenceDate}
      />

      <IconButton
        iconProps={calendarIconProps.next}
        buttonProps={{
          onPress: handleNextWeek,
        }}
      />
    </View>
  );
};
