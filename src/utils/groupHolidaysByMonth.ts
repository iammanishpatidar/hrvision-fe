import { HolidayInfo } from '@/pages/setting/holiday';

export const groupHolidaysByMonthYear = (holidays: any[]): Record<string, HolidayInfo[]> => {
  // Helper to get a sortable key (YYYY-MM)
  const getSortKey = (dateObj: Date) =>
    `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
  const monthYearMap: Record<string, { key: string; holidays: HolidayInfo[] }> = {};
  holidays.forEach(holiday => {
    const dateObj = new Date(holiday.date);
    if (isNaN(dateObj.getTime())) return;
    const monthYear = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
    const sortKey = getSortKey(dateObj);
    if (!monthYearMap[monthYear]) monthYearMap[monthYear] = { key: sortKey, holidays: [] };
    monthYearMap[monthYear].holidays.push({
      ...holiday,
      date: dateObj,
      allowedEmployeeType: holiday.allowedEmployeeType || holiday.allowedEmployeeType || [],
    });
  });
  // Sort by the sortable key
  const sortedEntries = Object.entries(monthYearMap).sort((a, b) =>
    a[1].key.localeCompare(b[1].key)
  );
  // Return as Record<string, HolidayInfo[]>
  return Object.fromEntries(
    sortedEntries.map(([monthYear, { holidays }]) => [monthYear, holidays])
  );
};
