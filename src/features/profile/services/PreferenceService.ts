import { User } from '../../../shared/interfaces/User';
import { habitsApi } from '../../../shared/services/habitsApi';
import { UpsertPreferenceSchema } from '../schemas/upsertPreferenceScema';

export class PreferenceService {
  static async upsert(data: UpsertPreferenceSchema): Promise<User> {
    const response = await habitsApi.patch('/users/preference', data);
    return response.data;
  }
}
