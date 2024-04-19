import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BaseTextInput } from '../../../../shared/components/BaseTextInput';
import { DefaultView } from '../../../../shared/components/DefaultView';
import { Divider } from '../../../../shared/components/Divider';
import { StackNavigationParamList } from '../../../../shared/navigation/stack';
import { ItemCreatableTypeSelector } from '../../components/ItemCreatableTypeSelector';
import { ItemList } from '../../components/ItemList';
import {
  appointmentListAsItemDataList,
  habitListAsItemDataList,
  reminderListAsItemDataList,
} from '../../data';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { editRoutineScreenStyles } from './styles';

export interface EditRoutineScreenParams {}

export interface EditRoutineScreenProps
  extends NativeStackScreenProps<
    StackNavigationParamList,
    'EditRoutineScreen'
  > {}

export const EditRoutineScreen: React.FC<EditRoutineScreenProps> = ({}) => {
  const { t } = useTranslation('routine');

  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  const itemDataList = useMemo(() => {
    if (selectedCreatableType === 'habit') {
      return habitListAsItemDataList;
    }

    if (selectedCreatableType === 'reminder') {
      return reminderListAsItemDataList;
    }

    if (selectedCreatableType === 'event') {
      return appointmentListAsItemDataList;
    }

    return [];
  }, [selectedCreatableType]);

  return (
    <DefaultView>
      <View style={editRoutineScreenStyles.container}>
        <ItemCreatableTypeSelector
          selectedCreatableType={selectedCreatableType}
          setSelectedCreatableType={setSelectedCreatableType}
        />

        <Divider />

        <BaseTextInput label={t('searchByName')} />
      </View>

      <ItemList
        itemDataList={itemDataList}
        defaultItemProps={{
          isEditing: true,
          onSelect: () => {},
        }}
      />
    </DefaultView>
  );
};
