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
      millisecond: newDate.getMilliseconds(),
    };
  }

  static buildDate({
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  }: {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
  }) {
    const newDate = new Date();

    if (year !== undefined) {
      newDate.setFullYear(year);
    }

    if (month !== undefined) {
      newDate.setMonth(month - 1);
    }

    if (day !== undefined) {
      newDate.setDate(day);
    }

    if (hour !== undefined) {
      newDate.setHours(hour);
    }

    if (minute !== undefined) {
      newDate.setMinutes(minute);
    }

    if (second !== undefined) {
      newDate.setSeconds(second);
    }

    if (millisecond !== undefined) {
      newDate.setMilliseconds(millisecond);
    }

    return newDate;
  }
}
