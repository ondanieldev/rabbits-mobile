import { ScrollView } from 'react-native';

import { ItemData } from '../../interfaces/ItemData';
import { itemListStyles } from './styles';
import { useItemList } from './use';

export interface ItemListProps {
  itemDataList: ItemData[];
}

export const ItemList: React.FC<ItemListProps> = props => {
  const { Items } = useItemList(props);

  return (
    <ScrollView contentContainerStyle={itemListStyles.container}>
      {Items}
    </ScrollView>
  );
};
