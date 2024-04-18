import { View } from 'react-native';

import { ItemCreatableType } from '../../enums/ItemCreatableType';
import { itemCreatableTypeSelectorStyles } from './styles';
import { useItemCreatableTypeSelector } from './use';

export interface ItemCreatableTypeSelectorProps {
  selectedCreatableType: ItemCreatableType;
  setSelectedCreatableType: React.Dispatch<
    React.SetStateAction<ItemCreatableType>
  >;
}

export const ItemCreatableTypeSelector: React.FC<
  ItemCreatableTypeSelectorProps
> = props => {
  const { Buttons } = useItemCreatableTypeSelector(props);

  return (
    <View style={itemCreatableTypeSelectorStyles.container}>{Buttons}</View>
  );
};
