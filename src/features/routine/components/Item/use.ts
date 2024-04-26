import { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ItemProps } from '.';
import { itemStyles } from './styles';

type Styles = {
  touchable: StyleProp<ViewStyle>;
  name: StyleProp<TextStyle>;
  date: StyleProp<TextStyle>;
};

export type ItemHook = (props: ItemProps) => {
  styles: Styles;
};

export const useItem: ItemHook = ({ data, isEditing, styles: propStyles }) => {
  const styles = useMemo<Styles>(() => {
    const applyHighlight = data.objectType === 'appointment' && !isEditing;

    return {
      touchable: StyleSheet.compose(
        itemStyles.touchable,
        propStyles?.touchable && propStyles?.touchable,
      ),
      date: applyHighlight ? itemStyles.appointmentText : {},
      name: applyHighlight
        ? StyleSheet.compose(itemStyles.name, itemStyles.appointmentText)
        : itemStyles.name,
    };
  }, [data, isEditing, propStyles]);

  return {
    styles,
  };
};
