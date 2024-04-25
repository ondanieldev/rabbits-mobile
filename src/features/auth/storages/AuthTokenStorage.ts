import { mmkvStorage } from '../../../shared/storage/mmkv';
import { AuthToken } from '../interfaces/AuthToken';

export const authTokenStorageKey = 'authToken';

export class AuthTokenStorage {
  public static set(authToken: AuthToken): void {
    mmkvStorage.set(authTokenStorageKey, JSON.stringify(authToken));
  }

  public static get(): AuthToken | null {
    const data = mmkvStorage.getString(authTokenStorageKey);
    return data ? JSON.parse(data) : null;
  }

  public static delete(): void {
    if (mmkvStorage.contains(authTokenStorageKey)) {
      mmkvStorage.delete(authTokenStorageKey);
    }
  }
}
