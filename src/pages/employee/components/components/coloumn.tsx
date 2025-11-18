import { Avatar, TableColumn } from '@fibonacci-innovative-solutions/hrms-design-library';
import { Tag } from '@fibonacci-innovative-solutions/hrms-design-library';
import { getContractTypeVariant } from '../../constants';

interface Employee {
  id: string;
  name: string;
  email: string;
  employee_id: string | null;
  department?: { id: string; name: string } | null;
  role?: { id: string; role: string } | null;
  date_of_hire?: string | null;
  employment_type?: string | null;
  avatar?: string | null;
}

export const EmployeeMainColumns: TableColumn<Employee>[] = [
  {
    key: 'name',
    title: 'Name',
    render: row => (
      <div className="flex items-center gap-3">
        <div>
          <Avatar src={row?.avatar || ''} alt={row.name} size={40} />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{row.name ?? '--'}</span>
          <span className="text-xs text-muted-foreground text-[#9C9FA1]">{row.email}</span>
        </div>
      </div>
    ),
  },
  // {
  //   key: 'employee_id',
  //   title: 'Employee ID',
  //   render: row => row.id || '—',
  // },
  {
    key: 'department',
    title: 'Department',
    render: row => row.department?.name || '—',
  },
  {
    key: 'role',
    title: 'Role',
    render: row => row.role?.role || '—',
  },
  {
    key: 'date_of_hire',
    title: 'Joining Date',
    render: row => (row.date_of_hire ? new Date(row.date_of_hire).toLocaleDateString() : '—'),
  },
  {
    key: 'employment_type',
    title: 'Contract Type',
    render: row =>
      row.employment_type ? (
        <Tag variant={getContractTypeVariant(row.employment_type)}>{row.employment_type}</Tag>
      ) : (
        '—'
      ),
  },
];
