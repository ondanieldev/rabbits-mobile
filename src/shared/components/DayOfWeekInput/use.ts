import { useCallback, useEffect, useMemo, useState } from 'react';

import { DayOfWeekInputProps } from '.';

export const useDayOfWeekInput = ({ form, name }: DayOfWeekInputProps<any>) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const totalValue = useMemo(() => form.watch(name), [form, name]);

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
      form.setValue(name, result);
    },
    [form, name, totalValue],
  );

  useEffect(() => {
    form.register(name);
  }, [form, name]);

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
