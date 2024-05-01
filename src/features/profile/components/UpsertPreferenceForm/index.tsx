import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { NotificationSwitchGroup } from '../NotificationSwitchGroup';
import { useUpsertPreferenceForm } from './use';
import { useUpsertPreferenceFormTranslation } from './useTranslation';

export const UpsertPreferenceForm: React.FC = () => {
  const { buttonText } = useUpsertPreferenceFormTranslation();
  const { form, onSubmit } = useUpsertPreferenceForm();

  return (
    <Form form={form}>
      <NotificationSwitchGroup form={form} />

      <Divider />

      <TextButton onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
