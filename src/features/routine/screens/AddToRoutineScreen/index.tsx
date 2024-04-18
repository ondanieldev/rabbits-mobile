import { Text } from 'react-native-svg';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DefaultView } from '../../../../shared/components/DefaultView';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';

export interface AddToRoutineScreenProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'AddToRoutineScreen'
  > {}

export const AddToRoutineScreen: React.FC<AddToRoutineScreenProps> = ({}) => {
  return (
    <DefaultView>
      <Text>Add to routine screen</Text>
    </DefaultView>
  );
};
