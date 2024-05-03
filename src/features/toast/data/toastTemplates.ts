import { CreateToast } from '../interfaces/CreateToast';

type Obj = CreateToast;
type Fn = (message: string) => Obj;

export const toastSuccessSignIn: Obj = {
  title: 'TITLE_SUCCESS_SIGN_IN',
  type: 'success',
};

export const toastErrorSignIn: Fn = message => ({
  message,
  title: 'TITLE_ERROR_SIGN_IN',
  type: 'error',
});

export const toastSuccessSignUp: Obj = {
  message: 'MESSAGE_SUCCESS_SIGN_UP',
  title: 'TITLE_SUCCESS_SIGN_UP',
  type: 'success',
};

export const toastErrorSignUp: Fn = message => ({
  message,
  title: 'TITLE_ERROR_SIGN_UP',
  type: 'error',
});

export const toastSuccessCreateAppointment: Obj = {
  title: 'TITLE_SUCCESS_CREATE_APPOINTMENT',
  type: 'success',
};

export const toastErrorCreateAppointment: Fn = message => ({
  message,
  title: 'TITLE_ERROR_CREATE_APPOINTMENT',
  type: 'error',
});

export const toastSuccessUpdateAppointment: Obj = {
  title: 'TITLE_SUCCESS_UPDATE_APPOINTMENT',
  type: 'success',
};

export const toastErrorUpdateAppointment: Fn = message => ({
  message,
  title: 'TITLE_ERROR_UPDATE_APPOINTMENT',
  type: 'error',
});

export const toastSuccessCreateHabit: Obj = {
  title: 'TITLE_SUCCESS_CREATE_HABIT',
  type: 'success',
};

export const toastErrorCreateHabit: Fn = message => ({
  message,
  title: 'TITLE_ERROR_CREATE_HABIT',
  type: 'error',
});

export const toastSuccessUpdateHabit: Obj = {
  title: 'TITLE_SUCCESS_UPDATE_HABIT',
  type: 'success',
};

export const toastErrorUpdateHabit: Fn = message => ({
  message,
  title: 'TITLE_ERROR_UPDATE_HABIT',
  type: 'error',
});

export const toastSuccessCreateReminder: Obj = {
  title: 'TITLE_SUCCESS_CREATE_REMINDER',
  type: 'success',
};

export const toastErrorCreateReminder: Fn = message => ({
  message,
  title: 'TITLE_ERROR_CREATE_REMINDER',
  type: 'error',
});

export const toastSuccessUpdateReminder: Obj = {
  title: 'TITLE_SUCCESS_UPDATE_REMINDER',
  type: 'success',
};

export const toastErrorUpdateReminder: Fn = message => ({
  message,
  title: 'TITLE_ERROR_UPDATE_REMINDER',
  type: 'error',
});

export const toastErrorSignOut: Fn = message => ({
  message,
  title: 'TITLE_ERROR_SIGN_OUT',
  type: 'error',
});

export const toastSuccessDeleteItem: Obj = {
  title: 'TITLE_SUCCESS_DELETE_ITEM',
  type: 'success',
};

export const toastErrorDeleteItem: Fn = message => ({
  message,
  title: 'TITLE_ERROR_DELETE_ITEM',
  type: 'error',
});

export const toastSuccessUpsertPreference: Obj = {
  title: 'TITLE_SUCCESS_UPSERT_PREFERENCE',
  type: 'success',
};

export const toastErrorUpsertPreference: Fn = message => ({
  message,
  title: 'TITLE_ERROR_UPSERT_PREFERENCE',
  type: 'error',
});

export const toastErrorResetPasswordGenerateToken: Fn = message => ({
  message,
  title: 'TITLE_ERROR_RESET_PASSWORD_GENERATE_TOKEN',
  type: 'error',
});

export const toastErrorResetPasswordValidateToken: Fn = message => ({
  message,
  title: 'TITLE_ERROR_RESET_PASSWORD_VALIDATE_TOKEN',
  type: 'error',
});
