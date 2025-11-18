import { Employee } from './types';

export const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'Jane Cooper',
    email: 'janecooper@gmail.com',
    employeeId: '121948A3H3',
    department: 'Finance',
    role: 'Sr. Accountant',
    joiningDate: 'Feb 23, 2025',
    contractType: 'Full-time',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Brooklyn Simmons',
    email: 'brooklynsimms@gmail.com',
    employeeId: 'BH4BHD127',
    department: 'Engineer',
    role: 'Lead. Back End Dev',
    joiningDate: 'Feb 18, 2025',
    contractType: 'Freelance',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'Leslie Alexander',
    email: 'alexanderles@gmail.com',
    employeeId: '18219ADANJ',
    department: 'Product',
    role: 'Jr. Technical Product',
    joiningDate: 'Dec 25, 2024',
    contractType: 'Internship',
    avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
    inactive: true,
  },
  {
    id: '4',
    name: 'Esther Howard',
    email: 'esthrhoward@gmail.com',
    employeeId: 'MMZKAO811',
    department: 'Finance',
    role: 'Lead. Accountant',
    joiningDate: 'Jan 10, 2025',
    contractType: 'Part-time',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: '5',
    name: 'Cameron Williamson',
    email: 'williamson@gmail.com',
    employeeId: 'H5A5H8188',
    department: 'Engineer',
    role: 'Sr. DevOps',
    joiningDate: 'Mar 30, 2025',
    contractType: 'Freelance',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: '6',
    name: 'Albert Flores',
    email: 'albertfls@gmail.com',
    employeeId: 'NXAHCH100',
    department: 'Marketing',
    role: 'Jr. Digital Marketing',
    joiningDate: 'Oct 4, 2024',
    contractType: 'Part-time',
    avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
    inactive: true,
  },
  {
    id: '7',
    name: 'Annette Black',
    email: 'annetteblack@gmail.com',
    employeeId: '5JARVB1742',
    department: 'Engineer',
    role: 'Jr. Front End Dev',
    joiningDate: 'Dec 19, 2024',
    contractType: 'Internship',
    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
  {
    id: '8',
    name: 'Darlene Robertson',
    email: 'darlenerobrt@gmail.com',
    employeeId: '7173BKAON',
    department: 'Marketing',
    role: 'Sr. Content Writer',
    joiningDate: 'Jan 28, 2025',
    contractType: 'Full-time',
    avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
  },
  {
    id: '9',
    name: 'Grande Ariana',
    email: 'grandeariana@gmail.com',
    employeeId: 'JAHD56661',
    department: 'Product',
    role: 'Lead. Product Manager',
    joiningDate: 'Feb 12, 2025',
    contractType: 'Full-time',
    avatar: 'https://randomuser.me/api/portraits/women/61.jpg',
  },
  {
    id: '10',
    name: 'Arlene McCoy',
    email: 'mccoyarlene@gmail.com',
    employeeId: 'LAKDB8137',
    department: 'Product',
    role: 'Sr. UI/UX Designer',
    joiningDate: 'Nov 10, 2024',
    contractType: 'Part-time',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

// Sample department options
export const departmentOptions = [
  { label: 'All Departments', value: 'all' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Engineer', value: 'Engineer' },
  { label: 'Product', value: 'Product' },
  { label: 'Marketing', value: 'Marketing' },
];

export const getContractTypeVariant = (contractType: string) => {
  switch (contractType) {
    case 'Full-time':
      return 'success';
    case 'Part-time':
      return 'primary';
    case 'Freelance':
      return 'pending';
    case 'Internship':
      return 'error';
    default:
      return 'primary';
  }
};
