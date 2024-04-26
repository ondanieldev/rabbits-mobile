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
    referenceDate,
    setReferenceDate,
    reminderList,
    isLoadingReminderList,
    isLoadingItemList,
    itemList,
    onToggleItem,
    isTogglingItem,
    completedCount,
    totalCount,
  } = useRoutineMainView();

  return (
    <DefaultView>
      <RoutineManager
        referenceDate={referenceDate}
        setReferenceDate={setReferenceDate}
        completedCount={completedCount}
        totalCount={totalCount}
      />

      <ReminderList
        reminderList={reminderList}
        defaultReminderItemProps={{
          onSelect: onToggleItem,
        }}
        isLoading={isLoadingReminderList}
      />

      <ItemList
        itemDataList={itemList}
        defaultItemProps={{
          onToggle: onToggleItem,
          isToggling: isTogglingItem,
        }}
        isLoading={isLoadingItemList}
      />
    </DefaultView>
  );
};
