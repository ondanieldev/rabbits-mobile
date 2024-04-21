import { OffsetPaginated } from '../../../shared/interfaces/OffsetPaginated';
import { OffsetPaginationQuery } from '../../../shared/interfaces/OffsetPaginationQuery';
import { habitsApi } from '../../../shared/services/habitsApi';
import { Appointment } from '../interfaces/Appointment';
import { CreateAppointment } from '../interfaces/CreateAppointment';
import { UpdateAppointment } from '../interfaces/UpdateAppointment';

export class AppointmentService {
  static async create(input: CreateAppointment): Promise<Appointment> {
    const response = await habitsApi.post<Appointment>('/appointments', input);
    return response.data;
  }

  static async readList(
    input: OffsetPaginationQuery,
  ): Promise<OffsetPaginated<Appointment>> {
    const response = await habitsApi.get<OffsetPaginated<Appointment>>(
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
    const response = await habitsApi.put<Appointment>(
      `/appointments/${id}`,
      input,
    );
    return response.data;
  }

  static async delete(taskId: string): Promise<string> {
    await habitsApi.delete<Appointment>(`/appointments/${taskId}`);
    return taskId;
  }
}
