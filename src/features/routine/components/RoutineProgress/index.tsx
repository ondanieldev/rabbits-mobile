import { Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { colors } from '../../../../shared/styles/globalStyles';
import { routineProgressStyles } from './styles';
import { useRoutineProgress } from './use';

export interface RoutineProgressProps {
  completedCount: number;
  totalCount: number;
}

export const RoutineProgress: React.FC<RoutineProgressProps> = props => {
  const { progress, text } = useRoutineProgress(props);

  return (
    <View style={routineProgressStyles.container}>
      <Text style={routineProgressStyles.text}>{text}</Text>

      <Progress.Bar
        color={colors.primary}
        unfilledColor={colors.selectable}
        borderWidth={0}
        progress={progress}
        width={null}
      />
    </View>
  );
};
