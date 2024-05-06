import { User } from '../../../shared/interfaces/User';
import { appApi } from '../../../shared/services/appApi';
import { UpsertPreferenceSchema } from '../schemas/upsertPreferenceScema';

export class PreferenceService {
  static async upsert(data: UpsertPreferenceSchema): Promise<User> {
    const response = await appApi.patch('/users/preferences', data);
    return response.data;
  }
}
