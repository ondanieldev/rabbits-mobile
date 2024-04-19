import { useState } from 'react';

import { ItemCreatableType } from '../../enums/ItemCreatableType';

export type RoutineUpsertViewHook = () => {
  selectedCreatableType: ItemCreatableType;
  setSelectedCreatableType: React.Dispatch<
    React.SetStateAction<ItemCreatableType>
  >;
};

export const useRoutineUpsertView: RoutineUpsertViewHook = () => {
  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  return {
    selectedCreatableType,
    setSelectedCreatableType,
  };
};
