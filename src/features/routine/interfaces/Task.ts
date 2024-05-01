import { User } from '../../../shared/interfaces/User';
import { TaskKind } from '../enums/TaskKind';

export interface Task {
  id: string;
  kind: TaskKind;
  name: string;
  hours: number;
  minutes: number;
  daysOfWeek: number[];
  isNotificationEnabled: boolean;
  isSoundEnabled: boolean;
  userId: string;
  user?: User;
}
