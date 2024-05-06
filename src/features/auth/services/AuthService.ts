import { User } from '../../../shared/interfaces/User';
import { appApi } from '../../../shared/services/appApi';
import { AuthToken } from '../interfaces/AuthToken';
import { SignIn } from '../interfaces/SignIn';
import { SignUp } from '../interfaces/SignUp';

export class AuthService {
  public static async signIn(data: SignIn): Promise<AuthToken> {
    const response = await appApi.post<AuthToken>('/auth/sign-in', data);
    return response.data;
  }

  public static async signOut(): Promise<void> {
    await appApi.post('/auth/sign-out');
  }

  public static async signUp(data: SignUp): Promise<User> {
    const response = await appApi.post<User>('/auth/sign-up', data);
    return response.data;
  }

  public static async ping(): Promise<void> {
    const response = await appApi.get('/auth/ping');
    return response.data;
  }
}
