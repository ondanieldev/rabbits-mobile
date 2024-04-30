import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';

import { Text } from '../../../../shared/components/Text';
import { colors, iconSizes } from '../../../../shared/styles/globalStyles';
import { Toast as IToast } from '../../interfaces/Toast';
import { toastStyles } from './styles';

export interface ToastProps {
  data: IToast;
  onPress?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  data: { message, title, type },
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={StyleSheet.compose(toastStyles.container, toastStyles[type])}>
      <View style={toastStyles.header}>
        <Text style={toastStyles.title}>{title}</Text>
        <FeIcon name="x" color={colors.primaryText} size={iconSizes.sm} />
      </View>

      {message && <Text style={toastStyles.message}>{message}</Text>}
    </TouchableOpacity>
  );
};
