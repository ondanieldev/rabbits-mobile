import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

import { ItemCreatableTypeSelectorProps } from '.';
import { SelectableButton } from '../../../../shared/components/SelectableButton';
import { itemCreatableTypes } from '../../enums/ItemCreatableType';
import { itemCreatableTypeSelectorStyles } from './styles';

export type ItemCreatableTypeSelectorHook = (
  props: ItemCreatableTypeSelectorProps,
) => {
  Buttons: JSX.Element[];
};

export const useItemCreatableTypeSelector: ItemCreatableTypeSelectorHook = ({
  selectedCreatableType,
  setSelectedCreatableType,
}) => {
  const Buttons = useMemo(
    () =>
      itemCreatableTypes.map(type => {
        const isSelected = selectedCreatableType === type;
        return (
          <SelectableButton
            key={type}
            onPress={() => setSelectedCreatableType(type)}
            isSelected={isSelected}
            styles={{
              touchable: itemCreatableTypeSelectorStyles.buttonTouchable,
              view: itemCreatableTypeSelectorStyles.buttonView,
            }}>
            <Text
              style={StyleSheet.compose(
                itemCreatableTypeSelectorStyles.text,
                isSelected ? itemCreatableTypeSelectorStyles.selectedText : {},
              )}>
              {type}
            </Text>
          </SelectableButton>
        );
      }),
    [selectedCreatableType, setSelectedCreatableType],
  );

  return {
    Buttons,
  };
};
