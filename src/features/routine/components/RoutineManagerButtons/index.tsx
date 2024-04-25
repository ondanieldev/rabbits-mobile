import { View } from 'react-native';

import { CircleIconButton } from '../../../../shared/components/CircleIconButton';
import { iconSizes } from '../../../../shared/styles/globalStyles';
import { routineManagerButtonsStyles } from './style';
import { useRoutineManagerButtons } from './use';

export const RoutineManagerButtons: React.FC = () => {
  const { handleSignOut, signOutStatus, handleAdd, handleEdit } =
    useRoutineManagerButtons();

  return (
    <View style={routineManagerButtonsStyles.container}>
      <CircleIconButton
        iconProps={{
          name: 'plus',
          size: iconSizes.md,
        }}
        buttonProps={{
          onPress: handleAdd,
        }}
      />
      <CircleIconButton
        iconProps={{
          name: 'edit-2',
          size: iconSizes.sm,
        }}
        buttonProps={{
          onPress: handleEdit,
        }}
      />
      <CircleIconButton
        iconProps={{
          name: 'log-out',
          size: iconSizes.sm,
        }}
        buttonProps={{
          onPress: handleSignOut,
          isLoading: signOutStatus === 'pending',
        }}
      />
    </View>
  );
};
