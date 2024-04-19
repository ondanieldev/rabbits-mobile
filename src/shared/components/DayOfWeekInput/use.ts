import { useCallback } from 'react';

export type DayOfWeekInputHook = () => {
  onPress: (
    totalValue: number[],
    value: number,
    isSelected: boolean,
  ) => number[];
};

export const useDayOfWeekInput: DayOfWeekInputHook = () => {
  const onPress = useCallback(
    (totalValue: number[], value: number, isSelected: boolean) => {
      if (!Array.isArray(totalValue)) {
        totalValue = [];
      }
      const index = totalValue.indexOf(value);
      if (isSelected && index === -1) {
        totalValue.push(value);
      } else if (!isSelected && index !== -1) {
        totalValue.splice(index, 1);
      }
      return totalValue;
    },
    [],
  );

  return {
    onPress,
  };
};
