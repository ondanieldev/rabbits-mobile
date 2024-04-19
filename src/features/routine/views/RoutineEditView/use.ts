import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  appointmentListAsItemDataList,
  habitListAsItemDataList,
  reminderListAsItemDataList,
} from '../../data';
import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { ItemData } from '../../interfaces/ItemData';

export type RoutineEditViewHook = () => {
  selectedCreatableType: ItemCreatableType;
  setSelectedCreatableType: React.Dispatch<
    React.SetStateAction<ItemCreatableType>
  >;
  itemDataList: ItemData[];
  searchLabel: string;
};

export const useRoutineEditView = () => {
  const { t } = useTranslation('routine');

  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  const itemDataList = useMemo<ItemData[]>(() => {
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

  const searchLabel = useMemo(() => t('searchByName'), [t]);

  return {
    selectedCreatableType,
    setSelectedCreatableType,
    itemDataList,
    searchLabel,
  };
};
