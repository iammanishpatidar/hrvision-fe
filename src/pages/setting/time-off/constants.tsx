import { TableColumn } from '@fibonacci-innovative-solutions/hrms-design-library';

export type TimeOffColumnType = {
  id?: string;
  name: string;
  max_leaves: number;
  is_carry_forward_allowed: boolean;
  is_approval_required: boolean;
  allowed_genders: string[];
  allowed_employee_type: string[];
  business_id: string;
};

export const timeOffColumns: TableColumn<TimeOffColumnType>[] = [
  {
    key: 'name',
    title: 'Time Off Type',
  },
  {
    key: 'max_leaves',
    title: 'Days Paid',
  },
  {
    key: 'is_approval_required',
    title: 'Approval Required',
    render: row => (
      <p className={`${row.is_approval_required === true ? 'text-green-500' : 'text-red-500'}`}>
        {row.is_approval_required ? 'Yes' : 'No'}
      </p>
    ),
  },
  {
    key: 'is_carry_forward_allowed',
    title: 'Carry Forward',
    render: row => (
      <p className={`${row.is_carry_forward_allowed === true ? 'text-green-500' : 'text-red-500'}`}>
        {row.is_carry_forward_allowed ? 'Yes' : 'No'}
      </p>
    ),
  },
];
