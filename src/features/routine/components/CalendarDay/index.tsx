import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

import { SelectableButton } from '../../../../shared/components/SelectableButton';
import { useCalendarDay } from './use';
import { useCalendarDayTranslation } from './useTranslation';

export type CalendarDayStyles = {
  container: StyleProp<ViewStyle>;
  dayOfWeek: StyleProp<TextStyle>;
  day: StyleProp<TextStyle>;
};

export interface CalendarDayProps {
  referenceDate: Date;
  setReferenceDate: (date: Date) => void;
  date: Date;
  customChildren?: React.ReactNode;
  styles?: CalendarDayStyles;
}

export const CalendarDay: React.FC<CalendarDayProps> = props => {
  const { day, dayOfWeek } = useCalendarDayTranslation(props);

  const { isSelected, styles, onPress } = useCalendarDay(props);

  return (
    <SelectableButton
      onPress={onPress}
      styles={{ view: styles.container }}
      isSelected={isSelected}>
      {props.customChildren ? (
        props.customChildren
      ) : (
        <>
          <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
          <Text style={styles.day}>{day}</Text>
        </>
      )}
    </SelectableButton>
  );
};
