import { NotificationType } from '../enums/NotificationType';

export interface Notification {
  id: string;
  title: string;
  message?: string;
  type: NotificationType;
  timestamp: number;
}
