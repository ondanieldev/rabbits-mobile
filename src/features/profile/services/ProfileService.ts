import { User } from '../../../shared/interfaces/User';
import { appApi } from '../../../shared/services/appApi';

export class ProfileService {
  public static async readProfile(): Promise<User> {
    const response = await appApi.get<User>('/users/profile');
    return response.data;
  }
}
