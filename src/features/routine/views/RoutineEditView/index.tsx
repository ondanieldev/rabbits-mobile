import { View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BaseTextInput } from '../../../../shared/components/BaseTextInput';
import { DefaultView } from '../../../../shared/components/DefaultView';
import { Divider } from '../../../../shared/components/Divider';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { ItemCreatableTypeSelector } from '../../components/ItemCreatableTypeSelector';
import { ItemList } from '../../components/ItemList';
import { routineEditViewStyles } from './styles';
import { useRoutineEditView } from './use';

export interface RoutineEditViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'RoutineEditScreen'
  > {}

export const RoutineEditView: React.FC<RoutineEditViewProps> = ({}) => {
  const {
    searchLabel,
    selectedCreatableType,
    setSelectedCreatableType,
    itemDataList,
    search,
    setSearch,
    onSelect,
    onDelete,
    isDeleting,
  } = useRoutineEditView();

  return (
    <DefaultView>
      <View style={routineEditViewStyles.container}>
        <ItemCreatableTypeSelector
          selectedCreatableType={selectedCreatableType}
          setSelectedCreatableType={setSelectedCreatableType}
        />

        <Divider />

        <BaseTextInput
          label={searchLabel}
          onChangeText={setSearch}
          value={search}
        />
      </View>

      <ItemList
        itemDataList={itemDataList}
        defaultItemProps={{
          isEditing: true,
          isDeleting,
          onSelect,
          onDelete,
        }}
      />
    </DefaultView>
  );
};
