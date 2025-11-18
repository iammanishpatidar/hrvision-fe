export const getFormattedNotificationTime = (timestamp: string): string => {
  const dateObj = new Date(timestamp);
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - dateObj.getTime();
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const am_pm = hours >= 12 ? 'PM' : 'AM';
    return `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${am_pm}`;
  };

  // Less than an hour ago
  if (minutesDiff < 60) {
    return `${minutesDiff}m ago`;
  }

  // Less than 24 hours ago
  if (hoursDiff < 24 && dateObj.getDate() === currentDate.getDate()) {
    return `${hoursDiff}h ago`;
  }

  // Check if it was "Yesterday"
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  const isYesterday =
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear();

  if (isYesterday) {
    return `Yesterday ${formatTime(dateObj)}`;
  }

  // return full date format like "Sep 12 | 10:54 am"
  const shortMonthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = shortMonthNames[dateObj.getMonth()];
  const day = dateObj.getDate();

  return `${month} ${day} | ${formatTime(dateObj)}`;
};
