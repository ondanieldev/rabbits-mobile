import { useCallback } from 'react';

import { ItemListProps } from '.';
import { ItemData } from '../../interfaces/ItemData';
import { Item } from '../Item';
import { itemListStyles } from './styles';

export const useItemList = ({
  defaultItemProps,
  itemDataList,
}: ItemListProps) => {
  const renderItem = useCallback(
    (item: ItemData, index: number) => {
      let touchable = itemListStyles.defaultItem;
      if (index === 0) {
        touchable = itemListStyles.firstItem;
      } else if (index === itemDataList.length - 1) {
        touchable = itemListStyles.lastItem;
      } else {
        touchable = itemListStyles.middleItem;
      }

      return (
        <Item
          {...defaultItemProps}
          data={item}
          styles={{ touchable }}
          isDeleting={defaultItemProps?.isDeleting}
          isToggling={defaultItemProps?.isToggling}
          onDelete={() => {
            defaultItemProps?.onDelete?.(item);
          }}
          onToggle={() => {
            defaultItemProps?.onToggle?.(item);
          }}
        />
      );
    },
    [defaultItemProps, itemDataList],
  );

  return {
    renderItem,
  };
};
