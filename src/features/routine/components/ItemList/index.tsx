import { ActivityIndicator, ScrollView, View } from 'react-native';

import { colors } from '../../../../shared/styles/globalStyles';
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
  const { Items } = useItemList(props);

  return !props.isLoading ? (
    <ScrollView contentContainerStyle={itemListStyles.container}>
      {Items}
    </ScrollView>
  ) : (
    <View style={itemListStyles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} animating />
    </View>
  );
};
