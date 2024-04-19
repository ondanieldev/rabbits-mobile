import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DefaultView } from '../../../../shared/components/DefaultView';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { ItemList } from '../../components/ItemList';
import { ReminderList } from '../../components/ReminderList';
import { RoutineManager } from '../../components/RoutineManager';
import { useRoutineScreen } from './use';

export interface RoutineScreenParams {}

export interface RoutineScreenProps
  extends NativeStackScreenProps<StackNavigationParamList, 'RoutineScreen'> {
  referenceDate: Date;
  setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const RoutineScreen: React.FC<RoutineScreenProps> = ({
  referenceDate,
  setReferenceDate,
}) => {
  const { reminderList, itemDataList } = useRoutineScreen({
    referenceDate,
  });

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
          onSelect: () => {},
        }}
      />

      <ItemList
        itemDataList={itemDataList}
        defaultItemProps={{
          onSelect: () => {},
        }}
      />
    </DefaultView>
  );
};
