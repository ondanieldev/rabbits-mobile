import { useMemo } from 'react';

import { format } from 'date-fns';

import { ItemProps } from '.';

export type ItemTranslationHook = (props: ItemProps) => {
  dateText: string;
};

export const useItemTranslation: ItemTranslationHook = ({
  data,
  isEditing,
}) => {
  const dateText = useMemo(() => {
    if (!data.date) {
      return '';
    }
    if (data.objectType === 'appointment' && isEditing) {
      return format(data.date, 'dd/MM/yyyy - HH:mm');
    }
    if (data.kind !== 'reminder') {
      return format(data.date, 'HH:mm');
    }
    return '';
  }, [data, isEditing]);

  return {
    dateText,
  };
};
