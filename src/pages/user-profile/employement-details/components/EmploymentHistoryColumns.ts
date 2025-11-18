import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export type EmploymentHistoryColumn = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  designation: string;
};

const columnHelper = createColumnHelper<EmploymentHistoryColumn>();

export const employeeHistoryColumns = [
  columnHelper.accessor('id', {
    header: 'Contract ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Contact Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('startDate', {
    header: 'Start Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('endDate', {
    header: 'End Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('designation', {
    header: 'Designation',
    cell: info => info.getValue(),
  }),
] as ColumnDef<EmploymentHistoryColumn, unknown>[];
