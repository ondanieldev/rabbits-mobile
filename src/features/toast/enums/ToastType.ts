export const toastTypes = ['success', 'error'] as const;

export type ToastType = (typeof toastTypes)[number];
