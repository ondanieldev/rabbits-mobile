import { View } from 'react-native';

import { toastContainerStyles } from './styles';

export interface ToastContainerProps {
  children: React.ReactNode;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ children }) => {
  return (
    <View style={toastContainerStyles.wrapper}>
      <View style={toastContainerStyles.contentContainer}>{children}</View>
    </View>
  );
};
