import { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { format } from 'date-fns';

import { ItemProps } from '.';
import { itemStyles } from './styles';

type Styles = {
  name: StyleProp<TextStyle>;
  date: StyleProp<TextStyle>;
};

export type ItemHook = (props: ItemProps) => {
  dateText: string;
  styles: Styles;
};

export const useItem: ItemHook = ({ data, isEditing }) => {
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

  const styles = useMemo<Styles>(() => {
    const applyCustom = data.objectType === 'appointment' && !isEditing;

    return {
      date: applyCustom
        ? StyleSheet.compose(itemStyles.date, itemStyles.appointmentText)
        : itemStyles.date,
      name: applyCustom
        ? StyleSheet.compose(itemStyles.name, itemStyles.appointmentText)
        : itemStyles.name,
    };
  }, [data, isEditing]);

  return {
    dateText,
    styles,
  };
};
