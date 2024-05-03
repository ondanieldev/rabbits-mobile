import { View } from 'react-native';

import { CircleIconButton } from '../../../../shared/components/CircleIconButton';
import { routineManagerButtonsIconProps } from './data';
import { routineManagerButtonsStyles } from './style';
import { useRoutineManagerButtons } from './use';

export const RoutineManagerButtons: React.FC = () => {
  const {
    handleSignOut,
    signOutStatus,
    handleAdd,
    handleEdit,
    handlePreference,
    handleDebug,
  } = useRoutineManagerButtons();

  return (
    <View style={routineManagerButtonsStyles.container}>
      <CircleIconButton
        iconProps={routineManagerButtonsIconProps.add}
        buttonProps={{
          onPress: handleAdd,
        }}
      />

      <CircleIconButton
        iconProps={routineManagerButtonsIconProps.edit}
        buttonProps={{
          onPress: handleEdit,
        }}
      />

      <CircleIconButton
        iconProps={routineManagerButtonsIconProps.preferences}
        buttonProps={{
          onPress: handlePreference,
        }}
      />

      <CircleIconButton
        iconProps={routineManagerButtonsIconProps.debug}
        buttonProps={{
          onPress: handleDebug,
        }}
      />

      <CircleIconButton
        iconProps={routineManagerButtonsIconProps.signOut}
        buttonProps={{
          onPress: handleSignOut,
          isLoading: signOutStatus === 'pending',
        }}
      />
    </View>
  );
};
