import { ToastType } from '../enums/ToastType';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  timestamp: number;
}
