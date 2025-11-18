import { TableColumn } from '@fibonacci-innovative-solutions/hrms-design-library';

export type EmployeeLeaveColumn = {
  id: string;
  dateRange: string;
  type: string;
  day: string;
  status: string;
  approver: string;
};

export const employeeData: EmployeeLeaveColumn[] = [
  {
    id: '1',
    dateRange: '10-12 Mar 2025',
    type: 'Sick Leave',
    day: '1',
    status: 'Approved',
    approver: 'John Doe',
  },
  {
    id: '2',
    dateRange: '15-16 Apr 2025',
    type: 'Casual Leave',
    day: '2',
    status: 'Pending',
    approver: 'Jane Smith',
  },
  {
    id: '3',
    dateRange: '01-03 May 2025',
    type: 'Annual Leave',
    day: '3',
    status: 'Rejected',
    approver: 'Robert Brown',
  },
  {
    id: '4',
    dateRange: '22 May 2025',
    type: 'Sick Leave',
    day: '1',
    status: 'Approved',
    approver: 'Emily Clark',
  },
  {
    id: '5',
    dateRange: '12-13 Jun 2025',
    type: 'Casual Leave',
    day: '2',
    status: 'Approved',
    approver: 'John Doe',
  },
  {
    id: '6',
    dateRange: '20 Jul 2025',
    type: 'Sick Leave',
    day: '1',
    status: 'Pending',
    approver: 'Jane Smith',
  },
  {
    id: '7',
    dateRange: '05-08 Aug 2025',
    type: 'Annual Leave',
    day: '4',
    status: 'Approved',
    approver: 'Robert Brown',
  },
  {
    id: '8',
    dateRange: '18-19 Sep 2025',
    type: 'Casual Leave',
    day: '2',
    status: 'Rejected',
    approver: 'Emily Clark',
  },
  {
    id: '9',
    dateRange: '01 Oct 2025',
    type: 'Sick Leave',
    day: '1',
    status: 'Approved',
    approver: 'John Doe',
  },
  {
    id: '10',
    dateRange: '10-14 Nov 2025',
    type: 'Annual Leave',
    day: '5',
    status: 'Pending',
    approver: 'Jane Smith',
  },
];

export const leavetypeColumns: TableColumn<EmployeeLeaveColumn>[] = [
  {
    key: 'dateRange',
    title: 'Date Range',
  },
  {
    key: 'type',
    title: 'Type',
  },
  {
    key: 'day',
    title: 'Day',
  },
  {
    key: 'status',
    title: 'Status',
  },
  {
    key: 'approver',
    title: 'Approver',
  },
];
