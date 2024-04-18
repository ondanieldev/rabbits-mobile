import { View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DefaultView } from '../../../../shared/components/DefaultView';
import { Divider } from '../../../../shared/components/Divider';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
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
    <DefaultView>
      <View style={addToRoutineScreenStyles.container}>
        <ItemCreatableTypeSelector
          selectedCreatableType={selectedCreatableType}
          setSelectedCreatableType={setSelectedCreatableType}
        />

        <Divider />
      </View>
    </DefaultView>
  );
};
