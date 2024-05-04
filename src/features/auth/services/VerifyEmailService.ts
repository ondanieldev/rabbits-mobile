import { User } from '../../../shared/interfaces/User';
import { habitsApi } from '../../../shared/services/habitsApi';
import { UpdateEmail } from '../interfaces/UpdateEmail';
import { VerifyEmail } from '../interfaces/VerifyEmail';

export class VerifyEmailService {
  public static async generateToken(): Promise<void> {
    await habitsApi.post('/users/verify-email/generate-token');
  }

  public static async verifyEmail(data: VerifyEmail): Promise<void> {
    await habitsApi.post('/users/verify-email', data);
  }

  public static async updateEmail(data: UpdateEmail): Promise<User> {
    const respone = await habitsApi.patch<User>('/users/email', data);
    return respone.data;
  }
}
