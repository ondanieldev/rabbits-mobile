import { ScrollView } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DefaultView } from '../../../../shared/components/DefaultView';
import { Divider } from '../../../../shared/components/Divider';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { CreateAppointmentForm } from '../../components/CreateAppointmentForm';
import { CreateHabitForm } from '../../components/CreateHabitForm';
import { CreateReminderForm } from '../../components/CreateReminderForm';
import { ItemCreatableTypeSelector } from '../../components/ItemCreatableTypeSelector';
import { routineUpsertViewStyles } from './styles';
import { useRoutineUpsertView } from './use';

export interface RoutineUpsertViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'RoutineUpsertScreen'
  > {}

export const RoutineUpsertView: React.FC<RoutineUpsertViewProps> = props => {
  const {
    selectedCreatableType,
    setSelectedCreatableType,
    editingTask,
    editingAppointment,
  } = useRoutineUpsertView(props);

  return (
    <ScrollView
      style={routineUpsertViewStyles.container}
      contentContainerStyle={routineUpsertViewStyles.contentContainer}>
      {!editingTask && !editingAppointment && (
        <ItemCreatableTypeSelector
          selectedCreatableType={selectedCreatableType}
          setSelectedCreatableType={setSelectedCreatableType}
        />
      )}

      <Divider />

      {selectedCreatableType === 'habit' && (
        <CreateHabitForm editingHabit={editingTask} />
      )}
      {selectedCreatableType === 'reminder' && (
        <CreateReminderForm ediditingReminder={editingTask} />
      )}
      {selectedCreatableType === 'event' && (
        <CreateAppointmentForm editingAppointment={editingAppointment} />
      )}
    </ScrollView>
  );
};
