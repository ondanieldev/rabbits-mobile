import { User } from '../../../shared/interfaces/User';
import { appApi } from '../../../shared/services/appApi';
import { UpdateEmail } from '../interfaces/UpdateEmail';
import { VerifyEmail } from '../interfaces/VerifyEmail';

export class VerifyEmailService {
  public static async generateToken(): Promise<void> {
    await appApi.post('/users/verify-email/generate-token');
  }

  public static async verifyEmail(data: VerifyEmail): Promise<void> {
    await appApi.post('/users/verify-email', data);
  }

  public static async updateEmail(data: UpdateEmail): Promise<User> {
    const respone = await appApi.patch<User>('/users/email', data);
    return respone.data;
  }
}
