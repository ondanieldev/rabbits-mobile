import { User } from '../../../shared/interfaces/User';

export interface Appointment {
  id: string;
  name: string;
  date: string | Date;
  isCompleted: boolean;
  isNotificationEnabled: boolean;
  isSoundEnabled: boolean;
  userId: string;
  user?: User;
}
