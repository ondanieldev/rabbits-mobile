export const toastTemplates = [
  'signIn',
  'signUp',
  'createAppointment',
] as const;

export type ToastTemplate = (typeof toastTemplates)[number];
