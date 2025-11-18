import { TableColumn } from '@fibonacci-innovative-solutions/hrms-design-library';

export type JobTitleColumn = {
  id?: string;
  jobTitle: string;
  createdOn: string;
  visibleTo: string;
  action: string;
  description: string;
};

export const employeeData: JobTitleColumn[] = [
  {
    id: '1',
    jobTitle: 'Accountant',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '2',
    jobTitle: 'Buisness Analyst',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '3',
    jobTitle: 'Cheif Executive Ofiicer',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '4',
    jobTitle: 'HR',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '5',
    jobTitle: 'Manager',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '6',
    jobTitle: 'Sr. Software Engineer',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '7',
    jobTitle: 'Jr. Software Engineer',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '8',
    jobTitle: 'Marketing Assets',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '9',
    jobTitle: 'Marketing Assets',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '10',
    jobTitle: 'Marketing Assets',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
  {
    id: '11',
    jobTitle: 'Marketing Assets',
    createdOn: '28/02/2022',
    visibleTo: 'Employee & HR Manager',
    action: '',
    description:
      'Employee Data refers to the collection of information about employees within an organization, including personal details, job roles, salary, attendance, performance, and other HR-related metrics. It is essential for managing workforce operations, ensuring compliance, and supporting decision-making.',
  },
];

export const jobTitleColumns: TableColumn<JobTitleColumn>[] = [
  {
    key: 'jobTitle',
    title: 'Job Title',
  },
  {
    key: 'createdOn',
    title: 'Created On',
  },
];
