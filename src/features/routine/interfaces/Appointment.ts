import { User } from '../../../shared/interfaces/User';

export interface Appointment {
  id: string;
  name: string;
  date: string | Date;
  isCompleted: boolean;
  isNotificationEnabled: boolean;
  isSoundEnabled: boolean;
  isVibrationEnabled: boolean;
  userId: string;
  user?: User;
}
