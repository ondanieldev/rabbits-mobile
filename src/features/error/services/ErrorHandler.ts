import { AxiosError } from 'axios';

import { errorCodeUnknown } from '../data/errorCodes';
import { HabitsApiError } from '../interfaces/HabitsApiError';
import { ObjectError } from '../interfaces/ObjectError';

export type ErrorCode = string;

export class ErrorHandler {
  static handle(error: unknown) {
    if (error instanceof AxiosError) {
      return ErrorHandler.handleAxiosError(error);
    }
    if (typeof error === 'object') {
      return ErrorHandler.handleObjectError(error as ObjectError);
    }
    if (typeof error === 'string') {
      return error;
    }
    return errorCodeUnknown;
  }

  static handleAxiosError(error: AxiosError): ErrorCode {
    if (error.response?.data) {
      const errorData = error.response.data as HabitsApiError;
      const message = errorData.message;
      if (!message) {
        return errorCodeUnknown;
      }
      return Array.isArray(message) ? message[0] : message;
    }
    return errorCodeUnknown;
  }

  static handleObjectError(error: ObjectError): ErrorCode {
    return error.message ? error.message : errorCodeUnknown;
  }
}
