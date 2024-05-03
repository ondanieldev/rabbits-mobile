import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { Text } from '../../../../shared/components/Text';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { verifyEmailFormStyles } from './styles';
import { useVerifyEmailForm } from './use';
import { useVerifyEmailFormTranslation } from './useTranslation';

export const VerifyEmailForm: React.FC = () => {
  const {
    form,
    handleGenerateToken,
    isLoadingGenerateToken,
    isLoadingVerifyEmail,
    onSubmit,
  } = useVerifyEmailForm();

  const {
    resendTokenbuttonText,
    verifyEmailbuttonText,
    tokenLabel,
    tokenSentToEmail,
  } = useVerifyEmailFormTranslation();

  return (
    <Form form={form}>
      <Divider />

      <Text style={verifyEmailFormStyles.text}>{tokenSentToEmail}</Text>

      <Divider />

      <TextInput form={form} label={tokenLabel} name="token" />

      <Divider />

      <TextButton
        isLoading={isLoadingVerifyEmail}
        onPress={form.handleSubmit(onSubmit)}>
        {verifyEmailbuttonText}
      </TextButton>

      <TextButton
        style={verifyEmailFormStyles.resendButton}
        textStyle={verifyEmailFormStyles.resendButtonText}
        isLoading={isLoadingGenerateToken}
        onPress={handleGenerateToken}>
        {resendTokenbuttonText}
      </TextButton>
    </Form>
  );
};
