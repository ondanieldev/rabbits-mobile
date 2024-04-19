import { Text, TouchableHighlight } from 'react-native';

import { useSelectableDayOfWeek } from './use';

export type SelectableDayOfWeekLabel =
  | 'sundayInitial'
  | 'mondayInitial'
  | 'tuesdayInitial'
  | 'wednesdayInitial'
  | 'thursdayInitial'
  | 'fridayInitial'
  | 'saturdayInitial';

export interface SelectableDayOfWeekProps {
  defaultSelected?: boolean;
  label: SelectableDayOfWeekLabel;
  onPress?: (isSelected: boolean) => void;
}

export const SelectableDayOfWeek: React.FC<
  SelectableDayOfWeekProps
> = props => {
  const { label, styles, onPress } = useSelectableDayOfWeek(props);

  return (
    <TouchableHighlight onPress={onPress} style={styles.touchable}>
      <Text style={styles.label}>{label}</Text>
    </TouchableHighlight>
  );
};
