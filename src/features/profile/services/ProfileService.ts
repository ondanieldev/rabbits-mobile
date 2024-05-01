import { User } from '../../../shared/interfaces/User';
import { habitsApi } from '../../../shared/services/habitsApi';

export class ProfileService {
  public static async readProfile(): Promise<User> {
    const response = await habitsApi.get<User>('/user/profile');
    return response.data;
  }
}
