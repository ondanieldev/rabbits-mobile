import { Container } from '../../../../shared/components/Container';
import { Calendar } from '../Calendar';
import { RoutineProgress } from '../RoutineProgress';
import { RoutineManagerStyles } from './styles';

export interface RoutineManagerProps {
  completedCount: number;
  totalCount: number;
  referenceDate: Date;
  setReferenceDate: (date: Date) => void;
}

export const RoutineManager: React.FC<RoutineManagerProps> = ({
  referenceDate,
  setReferenceDate,
  completedCount,
  totalCount,
}) => {
  return (
    <Container style={RoutineManagerStyles.container}>
      <Calendar
        referenceDate={referenceDate}
        setReferenceDate={setReferenceDate}
      />

      <RoutineProgress
        completedCount={completedCount}
        totalCount={totalCount}
      />
    </Container>
  );
};
