import { TableColumn } from '@fibonacci-innovative-solutions/hrms-design-library';
import { formatDateDMY } from '../../../utils/formatDate';

export interface LeaveTypeSummary {
  id: string;
  name: string;
}

export interface EmployeeSummary {
  id: string;
  name: string;
}

export interface BusinessLeave {
  id: string;
  date: string | null;
  is_half_day: boolean;
  reason: string | null;
  status: string | null;
  leave_type_id: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  employee: EmployeeSummary | null;
  leave_types: LeaveTypeSummary | null;
}

export interface BusinessLeavesMeta {
  total: number;
  page: number;
  limit: number;
}

export interface BusinessLeavesResponse {
  statusCode: number;
  data: {
    leaves: BusinessLeave[];
    meta: BusinessLeavesMeta;
  };
  message: string;
}

export const LeaveRequestColumn = (): TableColumn<BusinessLeave>[] => [
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
];
