import { isPast } from 'date-fns';

import { DateUtils } from '../../../shared/utils/DateUtils';
import { Appointment } from '../../routine/interfaces/Appointment';
import { NotificationService } from './NotificationService';

export class AppointmentNotificationService {
  static getDate(appointment: Appointment) {
    const { year, month, day, hour, minute } = DateUtils.splitDate(
      appointment.date,
    );
    return DateUtils.buildDate({
      year,
      month,
      day,
      hour,
      minute,
      second: 0,
      millisecond: 0,
    });
  }

  static getId(appointment: Appointment) {
    return `appointment:${
      appointment.id
    }:${AppointmentNotificationService.getDate(appointment).getTime()}`;
  }

  static isId(id: string) {
    return id.startsWith('appointment:');
  }

  static async readIdList() {
    const notificationIdList = await NotificationService.readTriggerIdList();

    return notificationIdList.filter(id =>
      AppointmentNotificationService.isId(id),
    );
  }

  static async upsert(appointment: Appointment): Promise<string | null> {
    const date = AppointmentNotificationService.getDate(appointment);
    const id = AppointmentNotificationService.getId(appointment);

    if (!isPast(date)) {
      await NotificationService.upsertTrigger({
        id,
        timestamp: date.getTime(),
        title: appointment.name,
      });
      return id;
    }

    return null;
  }

  static async upsertList(appointmentList: Appointment[]) {
    const upsertedIdList = [];

    for (const appointment of appointmentList) {
      const id = await AppointmentNotificationService.upsert(appointment);

      if (id) {
        upsertedIdList.push(id);
      }
    }

    return upsertedIdList;
  }

  static async deleteDanglingList(newIdList: string[]) {
    const deletedIdList = [];
    const currentIdList = await AppointmentNotificationService.readIdList();

    for (const id of currentIdList) {
      if (!newIdList.includes(id)) {
        await NotificationService.delete(id);
        deletedIdList.push(id);
      }
    }

    return deletedIdList;
  }
}