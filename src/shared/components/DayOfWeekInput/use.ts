import { useCallback, useEffect, useState } from 'react';

import { DayOfWeekInputProps } from '.';

export const useDayOfWeekInput = ({ form, name }: DayOfWeekInputProps<any>) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [totalValue, setTotalValue] = useState<number[]>(
    form.watch(name) || [],
  );

  const onPress = useCallback(
    (value: number, isSelected: boolean) => {
      let result: number[] = [];
      if (!Array.isArray(totalValue)) {
        result = [];
      } else {
        result = [...totalValue];
      }
      const index = result.indexOf(value);
      if (isSelected && index === -1) {
        result.push(value);
      } else if (!isSelected && index !== -1) {
        result.splice(index, 1);
      }
      setTotalValue(result);
    },
    [totalValue],
  );

  useEffect(() => {
    form.register(name);
  }, [form, name]);

  useEffect(() => {
    form.setValue(name, totalValue);
  }, [totalValue, form, name]);

  useEffect(() => {
    const fieldError = form.formState.errors[name];
    if (fieldError?.message) {
      setError(fieldError.message as string);
    } else {
      setError(undefined);
    }
  }, [form, name, form.formState.errors]);

  return {
    totalValue,
    onPress,
    error,
  };
};
