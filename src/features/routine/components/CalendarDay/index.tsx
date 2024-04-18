import { Text } from 'react-native';

import { SelectableButton } from '../../../../shared/components/SelectableButton';
import { calendarDayStyles } from './styles';
import { useCalendarDay } from './use';

export interface CalendarDayProps {
  referenceDate: Date;
  setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
}

export const CalendarDay: React.FC<CalendarDayProps> = props => {
  const { day, dayOfWeek, isSelected, styles } = useCalendarDay(props);

  return (
    <SelectableButton
      onPress={() => props.setReferenceDate(props.date)}
      styles={{ view: calendarDayStyles.container }}
      isSelected={isSelected}>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <Text style={styles.day}>{day}</Text>
    </SelectableButton>
  );
};
