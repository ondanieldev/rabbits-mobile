import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DefaultView } from '../../../../shared/components/DefaultView';
import { Divider } from '../../../../shared/components/Divider';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { CreateAppointmentForm } from '../../components/CreateAppointmentForm';
import { CreateHabitForm } from '../../components/CreateHabitForm';
import { CreateReminderForm } from '../../components/CreateReminderForm';
import { ItemCreatableTypeSelector } from '../../components/ItemCreatableTypeSelector';
import { addToRoutineScreenStyles } from './styles';
import { useAddToRoutineScreen } from './use';

export interface AddToRoutineScreenProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'AddToRoutineScreen'
  > {}

export const AddToRoutineScreen: React.FC<AddToRoutineScreenProps> = ({}) => {
  const { selectedCreatableType, setSelectedCreatableType } =
    useAddToRoutineScreen();

  return (
    <DefaultView style={addToRoutineScreenStyles.container}>
      <ItemCreatableTypeSelector
        selectedCreatableType={selectedCreatableType}
        setSelectedCreatableType={setSelectedCreatableType}
      />

      <Divider />

      {selectedCreatableType === 'habit' && <CreateHabitForm />}
      {selectedCreatableType === 'reminder' && <CreateReminderForm />}
      {selectedCreatableType === 'event' && <CreateAppointmentForm />}
    </DefaultView>
  );
};
