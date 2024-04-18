import { Text, TouchableHighlight, View } from 'react-native';

import { useCalendarDay } from './use';

export interface CalendarDayProps {
  referenceDate: Date;
  setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
}

export const CalendarDay: React.FC<CalendarDayProps> = props => {
  const { day, dayOfWeek, styles } = useCalendarDay(props);

  return (
    <TouchableHighlight onPress={() => props.setReferenceDate(props.date)}>
      <View style={styles.container}>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
    </TouchableHighlight>
  );
};
