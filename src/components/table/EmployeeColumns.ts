import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export type Employee = {
  id: string;
  'Date Range': string;
  Type: string;
  Days: string;
  Status: string;
  Approver: string;
};

const columnHelper = createColumnHelper<Employee>();

export const employeeColumns = [
  columnHelper.accessor('Date Range', {
    header: 'Date Range',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Type', {
    header: 'Type',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Days', {
    header: 'Days',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Approver', {
    header: 'Approver',
    cell: info => info.getValue(),
  }),
] as ColumnDef<Employee, unknown>[];
