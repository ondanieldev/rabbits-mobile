import { useMemo } from 'react';

import { ItemListProps } from '.';
import { Item } from '../Item';
import { itemListStyles } from './styles';

export type ItemListHook = (props: ItemListProps) => {
  Items: JSX.Element[];
};

export const useItemList: ItemListHook = ({
  itemDataList,
  defaultItemProps,
}) => {
  const Items = useMemo(
    () =>
      itemDataList.map((data, index) => {
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
            key={data.id}
            data={data}
            styles={{ touchable }}
          />
        );
      }),
    [itemDataList, defaultItemProps],
  );

  return {
    Items,
  };
};
