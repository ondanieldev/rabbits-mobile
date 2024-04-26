export class DateUtils {
  static splitDate(date: Date | string | number) {
    const newDate = new Date(date);

    return {
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      monthIndex: newDate.getMonth(),
      day: newDate.getDate(),
      hour: newDate.getHours(),
      minute: newDate.getMinutes(),
      second: newDate.getSeconds(),
    };
  }

  static buildDate({
    year,
    month,
    day,
    hour,
    minute,
    second,
  }: {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
  }) {
    const newDate = new Date();

    if (year) {
      newDate.setFullYear(year);
    }

    if (month) {
      newDate.setMonth(month - 1);
    }

    if (day) {
      newDate.setDate(day);
    }

    if (hour) {
      newDate.setHours(hour);
    }

    if (minute) {
      newDate.setMinutes(minute);
    }

    if (second) {
      newDate.setSeconds(second);
    }

    return newDate;
  }
}
