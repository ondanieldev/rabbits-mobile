export const notificationTypes = ['success', 'error'] as const;

export type NotificationType = (typeof notificationTypes)[number];
