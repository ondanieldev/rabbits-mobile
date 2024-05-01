import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { SwitchInput } from '../../../../shared/components/SwitchInput';
import { Text } from '../../../../shared/components/Text';
import { TextButton } from '../../../../shared/components/TextButton';
import { upsertPreferenceFormStyles } from './styles';
import { useUpsertPreferenceForm } from './use';
import { useUpsertPreferenceFormTranslation } from './useTranslation';

export const UpsertPreferenceForm: React.FC = () => {
  const {
    notificationsTitle,
    isNotificationEnabledLabel,
    isSoundEnabledLabel,
    isVibrationEnabledLabel,
    buttonText,
  } = useUpsertPreferenceFormTranslation();

  const { form, onSubmit, isNotificationEnabled } = useUpsertPreferenceForm();

  return (
    <Form form={form}>
      <Text style={upsertPreferenceFormStyles.title}>{notificationsTitle}</Text>

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
            name="isVibrationEnable"
            label={isVibrationEnabledLabel}
          />
        </>
      )}

      <Divider />

      <TextButton onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
