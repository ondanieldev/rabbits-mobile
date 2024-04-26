import { Text } from 'react-native';

import { SelectableButton } from '../../../../shared/components/SelectableButton';
import { calendarDayStyles } from './styles';
import { useCalendarDay } from './use';
import { useCalendarDayTranslation } from './useTranslation';

export interface CalendarDayProps {
  referenceDate: Date;
  setReferenceDate: (date: Date) => void;
  date: Date;
}

export const CalendarDay: React.FC<CalendarDayProps> = props => {
  const { day, dayOfWeek } = useCalendarDayTranslation(props);

  const { isSelected, styles, onPress } = useCalendarDay(props);

  return (
    <SelectableButton
      onPress={onPress}
      styles={{ view: calendarDayStyles.container }}
      isSelected={isSelected}>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <Text style={styles.day}>{day}</Text>
    </SelectableButton>
  );
};
