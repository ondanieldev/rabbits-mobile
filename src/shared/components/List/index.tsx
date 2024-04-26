import { ActivityIndicator, FlatList, FlatListProps, View } from 'react-native';

import { colors } from '../../styles/globalStyles';
import { listStyles } from './styles';

export interface ListProps<T> extends FlatListProps<T> {
  isLoading?: boolean;
}

export const List: React.FC<ListProps<any>> = ({ isLoading, ...props }) => {
  if (isLoading) {
    return (
      <View style={listStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} animating />
      </View>
    );
  }

  return <FlatList {...props} />;
};
