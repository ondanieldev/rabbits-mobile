import { Task } from 'react-native';

import { Appointment } from '../../features/routine/interfaces/Appointment';

export interface User {
  email: string;
  tasks?: Task[];
  appointments?: Appointment[];
}
