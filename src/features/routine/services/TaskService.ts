import { OffsetPaginated } from '../../../shared/interfaces/OffsetPaginated';
import { OffsetPaginationQuery } from '../../../shared/interfaces/OffsetPaginationQuery';
import { habitsApi } from '../../../shared/services/habitsApi';
import { Task } from '../interfaces/Task';
import { UpsertTask } from '../interfaces/UpsertTask';

export class TaskService {
  static async create(input: UpsertTask): Promise<Task> {
    const response = await habitsApi.post<Task>('/tasks', input);
    return response.data;
  }

  static async readList(
    input: OffsetPaginationQuery,
  ): Promise<OffsetPaginated<Task>> {
    const response = await habitsApi.get<OffsetPaginated<Task>>('/tasks', {
      params: input,
    });
    return response.data;
  }

  static async update(input: UpsertTask): Promise<Task> {
    const response = await habitsApi.put<Task>('/tasks', input);
    return response.data;
  }

  static async delete(taskId: string): Promise<string> {
    await habitsApi.delete<Task>(`/tasks/${taskId}`);
    return taskId;
  }
}
