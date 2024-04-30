export const notificationTemplates = [
  'signIn',
  'signUp',
  'createAppointment',
] as const;

export type NotificationTemplate = (typeof notificationTemplates)[number];
