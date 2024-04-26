import { List } from '../../../../shared/components/List';
import { ItemData } from '../../interfaces/ItemData';
import { ItemProps } from '../Item';
import { itemListStyles } from './styles';
import { useItemList } from './use';

export interface ItemListProps {
  itemDataList: ItemData[];
  defaultItemProps?: Partial<ItemProps>;
  isLoading?: boolean;
}

export const ItemList: React.FC<ItemListProps> = props => {
  const { renderItem } = useItemList(props);

  return (
    <List
      data={props.itemDataList}
      renderItem={({ index, item }) => renderItem(item, index)}
      contentContainerStyle={itemListStyles.container}
      isLoading={props.isLoading}
    />
  );
};
