export const formatDateForDatePicker = (input: Date | string | null | undefined): string => {
  if (!input) return '';

  const date = new Date(input);
  if (isNaN(date.getTime())) return ''; // invalid date

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateDMY = (input: Date | string | null | undefined): string => {
  if (!input) return '';

  const date = new Date(input);
  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export function localDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-indexed
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00.000Z`;
}
