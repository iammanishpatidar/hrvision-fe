import { TableColumn } from '@fibonacci-innovative-solutions/hrms-design-library';

export type EmployementDetailsColumn = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  designation: string;
};
export const contractData: EmployementDetailsColumn[] = [
  {
    id: '#123456',
    name: 'Internship Agreement',
    startDate: '01 Jan, 2019',
    endDate: '01 Jul, 2019',
    designation: 'HR',
  },
  {
    id: '#123457',
    name: 'Consulting Agreement',
    startDate: '15 Feb, 2020',
    endDate: '15 Aug, 2020',
    designation: 'Finance',
  },
  {
    id: '#123458',
    name: 'Freelance Contract',
    startDate: '01 Mar, 2021',
    endDate: '01 Sep, 2021',
    designation: 'Marketing',
  },
  {
    id: '#123459',
    name: 'Part-time Contract',
    startDate: '01 Jun, 2022',
    endDate: '01 Dec, 2022',
    designation: 'Engineering',
  },
  {
    id: '#123460',
    name: 'Full-time Employment',
    startDate: '10 Jan, 2023',
    endDate: '10 Jan, 2024',
    designation: 'Sales',
  },
  {
    id: '#123461',
    name: 'Internship Agreement',
    startDate: '01 Jan, 2019',
    endDate: '01 Jul, 2019',
    designation: 'HR',
  },
  {
    id: '#123462',
    name: 'Consulting Agreement',
    startDate: '15 Feb, 2020',
    endDate: '15 Aug, 2020',
    designation: 'Finance',
  },
  {
    id: '#123463',
    name: 'Freelance Contract',
    startDate: '01 Mar, 2021',
    endDate: '01 Sep, 2021',
    designation: 'Marketing',
  },
  {
    id: '#123464',
    name: 'Part-time Contract',
    startDate: '01 Jun, 2022',
    endDate: '01 Dec, 2022',
    designation: 'Engineering',
  },
  {
    id: '#123465',
    name: 'Full-time Employment',
    startDate: '10 Jan, 2023',
    endDate: '10 Jan, 2024',
    designation: 'Sales',
  },
];

export const employementDetailColumns: TableColumn<EmployementDetailsColumn>[] = [
  {
    key: 'id',
    title: 'Contract Id',
  },
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'startDate',
    title: 'Start Date',
  },
  {
    key: 'endDate',
    title: 'End Date',
  },
  {
    key: 'designation',
    title: 'Designation',
  },
];
