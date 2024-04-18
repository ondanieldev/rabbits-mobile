import { Title } from '../../../../shared/components/Title';
import { useRoutineTitle } from './use';

export interface RoutineTitleProps {
  referenceDate: Date;
}

export const RoutineTitle: React.FC<RoutineTitleProps> = ({
  referenceDate,
}) => {
  const { title } = useRoutineTitle({
    referenceDate,
  });

  return <Title>{title}</Title>;
};
