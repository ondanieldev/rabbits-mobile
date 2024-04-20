import { User } from '../../../shared/interfaces/User';
import { habitsApi } from '../../../shared/services/habitsApi';
import { AccessToken } from '../interfaces/AccessToken';
import { Profile } from '../interfaces/Profile';
import { SignInSchema } from '../schemas/signInSchema';
import { SignUpSchema } from '../schemas/signUpSchema';

export class AuthService {
  public static async signIn(data: SignInSchema): Promise<AccessToken> {
    const response = await habitsApi.post<{
      accessToken: string;
    }>('/auth/sign-in', data);
    return response.data;
  }

  public static async signUp(data: SignUpSchema): Promise<User> {
    const response = await habitsApi.post<User>('/auth/sign-up', data);
    return response.data;
  }

  public static async readProfile(): Promise<Profile> {
    const response = await habitsApi.get<Profile>('/auth/profile');
    return response.data;
  }
}
