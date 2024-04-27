import { useCallback, useEffect, useMemo, useState } from 'react';

import { DayOfWeekInputProps } from '.';
import { SelectableDayOfWeek } from '../SelectableDayOfWeek';
import { selectableDayOfWeekDataList } from './data';

export const useDayOfWeekInput = ({
  form: { watch, setValue, register, formState },
  name,
}: DayOfWeekInputProps<any>) => {
  /**
   * Form value
   */
  const totalValue = watch(name);

  /**
   * Error state
   */
  const [error, setError] = useState<string | undefined>(undefined);

  /**
   * On item press handler
   */
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

  /**
   * List of selectable items
   */
  const selectableList = useMemo(() => {
    return selectableDayOfWeekDataList.map(data => {
      const isSelected = totalValue.includes(data.value);
      return (
        <SelectableDayOfWeek
          key={data.value}
          label={data.label}
          onPress={newValue => {
            onPress(data.value, newValue);
          }}
          isSelected={isSelected}
        />
      );
    });
  }, [onPress, totalValue]);

  /**
   * Register input on form when mounting
   */
  useEffect(() => {
    register(name);
  }, [register, name]);

  /**
   * Update error state when form error changes
   */
  useEffect(() => {
    const fieldError = formState.errors[name];
    if (fieldError?.message) {
      setError(fieldError.message as string);
    } else {
      setError(undefined);
    }
  }, [name, formState.errors]);

  return {
    error,
    onPress,
    selectableList,
    totalValue,
  };
};
