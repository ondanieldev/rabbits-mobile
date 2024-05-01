export interface UpsertTriggerNotification {
  id: string;
  title: string;
  body?: string;
  timestamp: number;
  sound?: boolean;
}
