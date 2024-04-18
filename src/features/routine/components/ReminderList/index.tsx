import { Container } from '../../../../shared/components/Container';
import { IconButton } from '../../../../shared/components/IconButton';
import { colors } from '../../../../shared/styles/globalStyles';
import { ItemData } from '../../interfaces/ItemData';
import { ReminderItem } from '../ReminderItem';
import { reminderListStyles } from './styles';
import { useReminderList } from './use';

export interface ReminderListProps {
  reminderList: ItemData[];
}

export const ReminderList: React.FC<ReminderListProps> = props => {
  const {
    currentReminder,
    hasNextReminder,
    hasPrevReminder,
    handleNextReminder,
    handlePrevReminder,
  } = useReminderList(props);

  return (
    <Container style={reminderListStyles.container}>
      <IconButton
        iconProps={{
          name: 'chevron-left',
          size: 40,
          color: colors.primaryText,
        }}
        buttonProps={{
          disabled: !hasPrevReminder,
          onPress: handlePrevReminder,
        }}
      />

      <ReminderItem data={currentReminder} />

      <IconButton
        iconProps={{
          name: 'chevron-right',
          size: 40,
          color: colors.primaryText,
        }}
        buttonProps={{
          disabled: !hasNextReminder,
          onPress: handleNextReminder,
        }}
      />
    </Container>
  );
};
