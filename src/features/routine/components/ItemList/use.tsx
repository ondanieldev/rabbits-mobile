import { useCallback, useState } from 'react';

import { ItemListProps } from '.';
import { ItemData } from '../../interfaces/ItemData';
import { Item } from '../Item';
import { itemListStyles } from './styles';

export const useItemList = ({
  defaultItemProps,
  itemDataList,
}: ItemListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

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
          isDeleting={defaultItemProps?.isDeleting && deletingId === item.id}
          isToggling={defaultItemProps?.isToggling && togglingId === item.id}
          onDelete={() => {
            setDeletingId(item.id);
            defaultItemProps?.onDelete?.(item);
          }}
          onToggle={() => {
            setTogglingId(item.id);
            defaultItemProps?.onToggle?.(item);
          }}
        />
      );
    },
    [defaultItemProps, itemDataList, deletingId, togglingId],
  );

  return {
    renderItem,
  };
};
