import { mmkvStorage } from '../../../shared/storage/mmkv';
import { AccessToken } from '../interfaces/AccessToken';

export const accessTokenStorageKey = 'accessToken';

export class AccessTokenStorage {
  public static set(accessToken: AccessToken): void {
    mmkvStorage.set(accessTokenStorageKey, JSON.stringify(accessToken));
  }

  public static get(): AccessToken | null {
    const data = mmkvStorage.getString(accessTokenStorageKey);
    return data ? JSON.parse(data) : null;
  }

  public static delete(): void {
    mmkvStorage.delete(accessTokenStorageKey);
  }
}
