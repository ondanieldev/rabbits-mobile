import { Notification } from './Notification';

export type CreateNotification = Omit<Notification, 'id' | 'timestamp'>;
