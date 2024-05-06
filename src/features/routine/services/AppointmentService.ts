import { OffsetPaginated } from '../../../shared/interfaces/OffsetPaginated';
import { OffsetPaginationQuery } from '../../../shared/interfaces/OffsetPaginationQuery';
import { appApi } from '../../../shared/services/appApi';
import { Appointment } from '../interfaces/Appointment';
import { CreateAppointment } from '../interfaces/CreateAppointment';
import { UpdateAppointment } from '../interfaces/UpdateAppointment';

export class AppointmentService {
  static async create(input: CreateAppointment): Promise<Appointment> {
    const response = await appApi.post<Appointment>('/appointments', input);
    return response.data;
  }

  static async readList(
    input: OffsetPaginationQuery,
  ): Promise<OffsetPaginated<Appointment>> {
    const response = await appApi.get<OffsetPaginated<Appointment>>(
      '/appointments',
      {
        params: input,
      },
    );
    return response.data;
  }

  static async update({
    id,
    ...input
  }: UpdateAppointment): Promise<Appointment> {
    const response = await appApi.put<Appointment>(
      `/appointments/${id}`,
      input,
    );
    return response.data;
  }

  static async delete(taskId: string): Promise<string> {
    await appApi.delete<Appointment>(`/appointments/${taskId}`);
    return taskId;
  }
}
