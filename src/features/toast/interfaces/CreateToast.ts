import { Toast } from './Toast';

export type CreateToast = Omit<Toast, 'id' | 'timestamp'>;
