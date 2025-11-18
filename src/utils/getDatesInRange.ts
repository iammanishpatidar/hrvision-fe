import { Holiday } from '@/components/LeaveLogEntry/LeaveLogEntry';

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

export const getHolidayForDate = (date: Date, holidays: Holiday[]): Holiday | undefined => {
  return holidays.find(holiday => {
    const holidayDate = new Date(holiday.date);
    return (
      holidayDate.getDate() === date.getDate() &&
      holidayDate.getMonth() === date.getMonth() &&
      holidayDate.getFullYear() === date.getFullYear()
    );
  });
};

export const getDatesInRange = (from: Date, to: Date): Date[] => {
  const dates: Date[] = [];
  const current = new Date(from);
  while (current <= to) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};
