import { useState } from 'react';

import { ItemCreatableType } from '../../enums/ItemCreatableType';

export type AddToRoutineScreenHook = () => {
  selectedCreatableType: ItemCreatableType;
  setSelectedCreatableType: React.Dispatch<
    React.SetStateAction<ItemCreatableType>
  >;
};

export const useAddToRoutineScreen: AddToRoutineScreenHook = () => {
  const [selectedCreatableType, setSelectedCreatableType] =
    useState<ItemCreatableType>('habit');

  return {
    selectedCreatableType,
    setSelectedCreatableType,
  };
};
