import { useCallback, useEffect, useState } from 'react';

import { DayOfWeekInputProps } from '.';

export const useDayOfWeekInput = ({
  form: { watch, setValue, register, formState },
  name,
}: DayOfWeekInputProps<any>) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const totalValue = watch(name);

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
      setValue(name, result);
    },
    [setValue, name, totalValue],
  );

  useEffect(() => {
    register(name);
  }, [register, name]);

  useEffect(() => {
    const fieldError = formState.errors[name];
    if (fieldError?.message) {
      setError(fieldError.message as string);
    } else {
      setError(undefined);
    }
  }, [name, formState.errors]);

  return {
    totalValue,
    onPress,
    error,
  };
};
