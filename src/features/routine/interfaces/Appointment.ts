import { User } from '../../../shared/interfaces/User';

export interface Appointment {
  id: string;
  name: string;
  date: string | Date;
  isCompleted: boolean;
  userId: string;
  user?: User;
}
