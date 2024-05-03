import { habitsApi } from '../../../shared/services/habitsApi';
import { VerifyEmail } from '../interfaces/VerifyEmail';

export class VerifyEmailService {
  public static async generateToken(): Promise<void> {
    await habitsApi.post('/users/verify-email/generate-token');
  }

  public static async verifyEmail(data: VerifyEmail): Promise<void> {
    await habitsApi.post('/users/verify-email', data);
  }
}
