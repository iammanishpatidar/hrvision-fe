import { TableColumn } from '@fibonacci-innovative-solutions/hrms-design-library';

export type Officer = {
  id: string;
  name: string;
  email: string;
  status: string;
  effectiveFrom: string;
  effectiveUntil: string;
};

export const ReliefOfficersColumn = (): TableColumn<Officer>[] => [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'email',
    title: 'Email',
  },
  {
    key: 'effectiveFrom',
    title: 'Effective From',
  },
  {
    key: 'effectiveUntil',
    title: 'Effective Until',
  },
  {
    key: 'status',
    title: 'Status',
    render: row => {
      const activeStatus = row.status.toLowerCase() === 'active' ? true : false;
      return (
        <div className={`${activeStatus ? 'text-green-600' : 'text-red-600'}`}>{row.status}</div>
      );
    },
  },
];
