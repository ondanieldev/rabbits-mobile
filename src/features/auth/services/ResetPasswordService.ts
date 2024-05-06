import { appApi } from '../../../shared/services/appApi';
import {
  ResetPassword,
  ResetPasswordGenerateToken,
  ResetPasswordValidateToken,
} from '../interfaces/ResetPassword';

export class ResetPasswordService {
  public static async generateToken(
    data: ResetPasswordGenerateToken,
  ): Promise<void> {
    await appApi.post('/users/reset-password/generate-token', data);
  }

  public static async validateToken(
    data: ResetPasswordValidateToken,
  ): Promise<void> {
    await appApi.post('/users/reset-password/validate-token', data);
  }

  public static async resetPassword(data: ResetPassword): Promise<void> {
    await appApi.post('/users/reset-password', data);
  }
}
