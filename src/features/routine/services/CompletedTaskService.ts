import { OffsetPaginated } from '../../../shared/interfaces/OffsetPaginated';
import { appApi } from '../../../shared/services/appApi';
import { CompletedTask } from '../interfaces/CompletedTask';
import { CreateCompletedTask } from '../interfaces/CreateCompletedTask';
import { ReadCompletedTaskList } from '../interfaces/RadCompletedTaskList';

export class CompletedTaskService {
  static async create(input: CreateCompletedTask): Promise<CompletedTask> {
    const response = await appApi.post<CompletedTask>(
      '/tasks/completed',
      input,
    );
    return response.data;
  }

  static async readList(
    input: ReadCompletedTaskList,
  ): Promise<OffsetPaginated<CompletedTask>> {
    const response = await appApi.get<OffsetPaginated<CompletedTask>>(
      '/tasks/completed',
      {
        params: input,
      },
    );
    return response.data;
  }

  static async delete(taskId: string): Promise<string> {
    await appApi.delete<CompletedTask>(`/tasks/completed/${taskId}`);
    return taskId;
  }
}
