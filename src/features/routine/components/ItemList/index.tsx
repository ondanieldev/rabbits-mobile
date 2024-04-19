import { ScrollView } from 'react-native';

import { ItemData } from '../../interfaces/ItemData';
import { ItemProps } from '../Item';
import { itemListStyles } from './styles';
import { useItemList } from './use';

export interface ItemListProps {
  itemDataList: ItemData[];
  defaultItemProps?: Partial<ItemProps>;
}

export const ItemList: React.FC<ItemListProps> = props => {
  const { Items } = useItemList(props);

  return (
    <ScrollView contentContainerStyle={itemListStyles.container}>
      {Items}
    </ScrollView>
  );
};
