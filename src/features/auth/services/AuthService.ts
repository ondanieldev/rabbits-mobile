import { User } from '../../../shared/interfaces/User';
import { habitsApi } from '../../../shared/services/habitsApi';
import { AuthToken } from '../interfaces/AuthToken';
import { Profile } from '../interfaces/Profile';
import { SignIn } from '../interfaces/SignIn';
import { SignUp } from '../interfaces/SignUp';

export class AuthService {
  public static async signIn(data: SignIn): Promise<AuthToken> {
    const response = await habitsApi.post<{
      accessToken: string;
    }>('/auth/sign-in', data);
    return response.data;
  }

  public static async signOut(): Promise<void> {
    await habitsApi.post('/auth/sign-out');
  }

  public static async signUp(data: SignUp): Promise<User> {
    const response = await habitsApi.post<User>('/auth/sign-up', data);
    return response.data;
  }

  public static async readProfile(): Promise<Profile> {
    const response = await habitsApi.get<Profile>('/auth/profile');
    return response.data;
  }
}
