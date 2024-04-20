import { AxiosError } from 'axios';

export interface HabitsApiError {
  message: string;
  statusCode: string;
  error: string;
}

export interface BaseError {
  message: string;
  title: string;
}

export class ErrorHandler {
  static handle(error: unknown) {
    if (error instanceof AxiosError) {
      return ErrorHandler.handleAxiosError(error);
    }
    return '0';
  }

  static handleAxiosError(error: AxiosError): string {
    if (error.response?.data) {
      const errorData = error.response.data as HabitsApiError;
      return errorData.message;
    }
    return error.message;
  }
}
