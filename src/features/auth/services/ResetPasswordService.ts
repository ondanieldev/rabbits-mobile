import { habitsApi } from '../../../shared/services/habitsApi';
import {
  ResetPassword,
  ResetPasswordGenerateToken,
  ResetPasswordValidateToken,
} from '../interfaces/ResetPassword';

export class ResetPasswordService {
  public static async generateToken(
    data: ResetPasswordGenerateToken,
  ): Promise<void> {
    await habitsApi.post('/users/reset-password/generate-token', data);
  }

  public static async validateToken(
    data: ResetPasswordValidateToken,
  ): Promise<void> {
    await habitsApi.post('/users/reset-password/validate-token', data);
  }

  public static async resetPassword(data: ResetPassword): Promise<void> {
    await habitsApi.post('/users/reset-password/reset-password', data);
  }
}
