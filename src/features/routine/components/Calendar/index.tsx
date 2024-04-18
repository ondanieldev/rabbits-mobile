import { View } from 'react-native';

import { IconButton } from '../../../../shared/components/IconButton';
import { CalendarWeek } from '../CalendarWeek';
import { calendarStyles } from './calendarStyles';
import { useCalendar } from './use';

export interface CalendarPops {
  referenceDate: Date;
  setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
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
        iconProps={{
          name: 'chevrons-left',
          size: 40,
        }}
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
        iconProps={{
          name: 'chevrons-right',
          size: 40,
        }}
        buttonProps={{
          onPress: handleNextWeek,
        }}
      />
    </View>
  );
};
