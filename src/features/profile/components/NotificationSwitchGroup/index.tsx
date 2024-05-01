import { FieldValues, UseFormReturn } from 'react-hook-form';

import { InputLabel } from '../../../../shared/components/InputLabel';
import { SwitchInput } from '../../../../shared/components/SwitchInput';
import { useNotificationSwitchGroupTranslation } from './useTranslation';

interface NotificationSwitchGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

export const NotificationSwitchGroup: React.FC<
  NotificationSwitchGroupProps<any>
> = ({ form }) => {
  const {
    isNotificationEnabledLabel,
    isSoundEnabledLabel,
    isVibrationEnabledLabel,
    groupLabel,
  } = useNotificationSwitchGroupTranslation();

  /**
   * Watch main field to show/hide other fields
   */
  const isNotificationEnabled = form.watch('isNotificationEnabled');

  return (
    <>
      <InputLabel>{groupLabel}</InputLabel>

      <SwitchInput
        form={form}
        name="isNotificationEnabled"
        label={isNotificationEnabledLabel}
      />

      {isNotificationEnabled && (
        <>
          <SwitchInput
            form={form}
            name="isSoundEnabled"
            label={isSoundEnabledLabel}
          />

          <SwitchInput
            form={form}
            name="isVibrationEnabled"
            label={isVibrationEnabledLabel}
          />
        </>
      )}
    </>
  );
};
