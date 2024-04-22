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
  > {
  referenceDate: Date;
  setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const RoutineMainView: React.FC<RoutineMainViewProps> = props => {
  const { reminderList, isLoadingReminderList, isLoadingItemList, itemList } =
    useRoutineMainView(props);

  return (
    <DefaultView>
      <RoutineManager
        referenceDate={props.referenceDate}
        setReferenceDate={props.setReferenceDate}
        completedCount={4}
        totalCount={10}
      />

      <ReminderList
        reminderList={reminderList}
        defaultReminderItemProps={{
          onSelect: () => {},
        }}
        isLoading={isLoadingReminderList}
      />

      <ItemList
        itemDataList={itemList}
        defaultItemProps={{
          onSelect: () => {},
        }}
        isLoading={isLoadingItemList}
      />
    </DefaultView>
  );
};
