import { Task } from 'react-native';

import { Appointment } from '../../features/routine/interfaces/Appointment';

export interface User {
  email: string;
  isNotificationEnabled: boolean;
  isSoundEnabled: boolean;
  isEmailVerified: boolean;
  tasks?: Task[];
  appointments?: Appointment[];
}
