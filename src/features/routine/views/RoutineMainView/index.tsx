import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DefaultView } from '../../../../shared/components/DefaultView';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { ItemList } from '../../components/ItemList';
import { ReminderList } from '../../components/ReminderList';
import { RoutineManager } from '../../components/RoutineManager';
import { useRoutineMainView } from './use';

export interface RoutineMainViewProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'RoutineMainScreen'
  > {}

export const RoutineMainView: React.FC<RoutineMainViewProps> = () => {
  const {
    reminderList,
    isLoadingReminderList,
    isLoadingItemList,
    itemList,
    referenceDate,
    setReferenceDate,
    onSelect,
  } = useRoutineMainView();

  return (
    <DefaultView>
      <RoutineManager
        referenceDate={referenceDate}
        setReferenceDate={setReferenceDate}
        completedCount={4}
        totalCount={10}
      />

      <ReminderList
        reminderList={reminderList}
        defaultReminderItemProps={{
          onSelect,
        }}
        isLoading={isLoadingReminderList}
      />

      <ItemList
        itemDataList={itemList}
        defaultItemProps={{
          onToggle: onSelect,
        }}
        isLoading={isLoadingItemList}
      />
    </DefaultView>
  );
};
