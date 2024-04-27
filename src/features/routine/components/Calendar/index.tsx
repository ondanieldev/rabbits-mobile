import { View } from 'react-native';

import { IconButton } from '../../../../shared/components/IconButton';
import { Text } from '../../../../shared/components/Text';
import { CalendarDay } from '../CalendarDay';
import { CalendarWeek } from '../CalendarWeek';
import { calendarStyles } from './calendarStyles';
import { calendarIconProps } from './data';
import { useCalendar } from './use';
import { useCalendarTranslation } from './useTranslation';

export interface CalendarPops {
  referenceDate: Date;
  setReferenceDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarPops> = ({
  referenceDate,
  setReferenceDate,
}) => {
  const { goToTodayText } = useCalendarTranslation();

  const { handleNextWeek, handlePrevWeek, scrollViewRef, showGoToToday } =
    useCalendar({
      referenceDate,
      setReferenceDate,
    });

  return (
    <View style={calendarStyles.container}>
      {showGoToToday === 'before' && (
        <GoToToday
          text={goToTodayText}
          referenceDate={referenceDate}
          setReferenceDate={setReferenceDate}
        />
      )}

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

      {showGoToToday === 'after' && (
        <GoToToday
          text={goToTodayText}
          referenceDate={referenceDate}
          setReferenceDate={setReferenceDate}
        />
      )}
    </View>
  );
};

const GoToToday = ({
  referenceDate,
  setReferenceDate,
  text,
}: CalendarPops & { text: string }) => {
  return (
    <CalendarDay
      date={new Date()}
      referenceDate={referenceDate}
      setReferenceDate={setReferenceDate}
      customChildren={
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={calendarStyles.textGoToToday}>
          {text}
        </Text>
      }
      styles={{
        container: calendarStyles.containerGoToToday,
        day: {},
        dayOfWeek: {},
      }}
    />
  );
};
