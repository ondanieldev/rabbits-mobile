import { useCallback, useState } from 'react';

import { DateTimePickerProps } from '.';

export const useDateTimePicker = ({
  formatDisplayedValue,
}: Pick<DateTimePickerProps<any>, 'formatDisplayedValue'>) => {
  const [show, setShow] = useState(false);

  const onPress = useCallback(() => {
    setShow(true);
  }, []);

  const getValue = useCallback(
    (fieldValue: Date) =>
      formatDisplayedValue
        ? formatDisplayedValue(fieldValue)
        : String(fieldValue),
    [formatDisplayedValue],
  );

  return {
    show,
    setShow,
    onPress,
    getValue,
  };
};
