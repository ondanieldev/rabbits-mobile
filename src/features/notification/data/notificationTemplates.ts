import { CreateNotification } from '../interfaces/CreateNotification';

type Obj = CreateNotification;
type Fn = (message: string) => Obj;

export const notificationSuccessSignIn: Obj = {
  title: 'TITLE_SUCCESS_SIGN_IN',
  type: 'success',
};

export const notificationErrorSignIn: Fn = message => ({
  message,
  title: 'TITLE_ERROR_SIGN_IN',
  type: 'error',
});

export const notificationSuccessSignUp: Obj = {
  message: 'MESSAGE_SUCCESS_SIGN_UP',
  title: 'TITLE_SUCCESS_SIGN_UP',
  type: 'success',
};

export const notificationErrorSignUp: Fn = message => ({
  message,
  title: 'TITLE_ERROR_SIGN_UP',
  type: 'error',
});

export const notificationSuccessCreateAppointment: Obj = {
  title: 'TITLE_SUCCESS_CREATE_APPOINTMENT',
  type: 'success',
};

export const notificationErrorCreateAppointment: Fn = message => ({
  message,
  title: 'TITLE_ERROR_CREATE_APPOINTMENT',
  type: 'error',
});

export const notificationSuccessUpdateAppointment: Obj = {
  title: 'TITLE_SUCCESS_UPDATE_APPOINTMENT',
  type: 'success',
};

export const notificationErrorUpdateAppointment: Fn = message => ({
  message,
  title: 'TITLE_ERROR_UPDATE_APPOINTMENT',
  type: 'error',
});

export const notificationSuccessCreateHabit: Obj = {
  title: 'TITLE_SUCCESS_CREATE_HABIT',
  type: 'success',
};

export const notificationErrorCreateHabit: Fn = message => ({
  message,
  title: 'TITLE_ERROR_CREATE_HABIT',
  type: 'error',
});

export const notificationSuccessUpdateHabit: Obj = {
  title: 'TITLE_SUCCESS_UPDATE_HABIT',
  type: 'success',
};

export const notificationErrorUpdateHabit: Fn = message => ({
  message,
  title: 'TITLE_ERROR_UPDATE_HABIT',
  type: 'error',
});

export const notificationSuccessCreateReminder: Obj = {
  title: 'TITLE_SUCCESS_CREATE_REMINDER',
  type: 'success',
};

export const notificationErrorCreateReminder: Fn = message => ({
  message,
  title: 'TITLE_ERROR_CREATE_REMINDER',
  type: 'error',
});

export const notificationSuccessUpdateReminder: Obj = {
  title: 'TITLE_SUCCESS_UPDATE_REMINDER',
  type: 'success',
};

export const notificationErrorUpdateReminder: Fn = message => ({
  message,
  title: 'TITLE_ERROR_UPDATE_REMINDER',
  type: 'error',
});

export const notificationErrorSignOut: Fn = message => ({
  message,
  title: 'TITLE_ERROR_SIGN_OUT',
  type: 'error',
});

export const notificationSuccessDeleteItem: Obj = {
  title: 'TITLE_SUCCESS_DELETE_ITEM',
  type: 'success',
};

export const notificationErrorDeleteItem: Fn = message => ({
  message,
  title: 'TITLE_ERROR_DELETE_ITEM',
  type: 'error',
});
