import { TableColumn } from '@fibonacci-innovative-solutions/hrms-design-library';
import { BusinessLeave } from '../requests/LeaveRequestColumn';
import { formatDateDMY } from '@/utils/formatDate';

// StatusBadge component for rendering status with color
const StatusBadge = ({ status, date }: { status: string | null; date: string | null }) => {
  const statusMap: Record<string, { text: string; className: string }> = {
    APPROVED: { text: 'APPROVED', className: 'text-green-600' },
    REJECT: { text: 'REJECTED', className: 'text-red-600' },
    EXPIRED: { text: 'EXPIRED', className: 'text-gray-500' },
  };
  const normalizedStatus = status?.toUpperCase().trim() ?? '';

  // Only APPROVED or REJECT are shown as is
  if (normalizedStatus === 'APPROVED' || normalizedStatus === 'REJECT') {
    const { text, className } = statusMap[normalizedStatus] || {
      text: status ?? '',
      className: '',
    };
    return <span className={`font-medium ${className}`}>{text}</span>;
  }

  // For other statuses, check if date is behind today
  let isExpired = false;
  if (date) {
    const leaveDate = new Date(date);
    const today = new Date();
    // Set time to 00:00:00 for comparison
    leaveDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    isExpired = leaveDate < today;
  }

  if (isExpired) {
    const { text, className } = statusMap['EXPIRED'];
    return <span className={`font-medium ${className}`}>{text}</span>;
  }

  // Otherwise, show the original status
  return <span className="font-medium">{status}</span>;
};

export const LeaveHistoryColumn = (): TableColumn<BusinessLeave>[] => [
  {
    key: 'name',
    title: 'Name',
    render: row => (
      <div className="flex items-center">
        {/* {row.avatar && (
          <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full mr-3 object-cover" />
        )} */}
        <div>
          <div className="font-medium">{row.employee?.name}</div>
          <div className="text-xs text-gray-500">ID: {row.employee?.id}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'date',
    title: 'Date',
    render: row => (
      <div
        className="border border-gray-200 rounded-sm px-2 py-1 inline-block text-gray-900 bg-white"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {formatDateDMY(row.date)}
      </div>
    ),
  },
  {
    key: 'name',
    title: 'Type',
    render: row => (
      <div className="flex items-center">
        <div className="font-medium">{row.leave_types?.name}</div>
      </div>
    ),
  },
  {
    key: 'is_half_day',
    title: 'Half/Full Day',
    render: row => (
      <div className="flex items-center">
        <div className="font-medium">{row.is_half_day ? 'Half' : 'Full'}</div>
      </div>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    render: row => (
      <div className="flex items-center">
        <StatusBadge status={row.status} date={row.date} />
      </div>
    ),
  },
];
