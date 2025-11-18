export const totalWorkingHours = 32400; // 9 hours = 9 * 60 * 60 seconds
export const workingHoursCompleted = 12000; // 3 hours = 3 * 60 * 60 seconds

export const profileImageUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww';

export const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export const religionOptions = [
  { label: 'Hindu', value: 'hindu' },
  { label: 'Muslim', value: 'muslim' },
  { label: 'Christian', value: 'christian' },
];

export const bloodTypeOptions = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

export const jobRoles = [
  { label: 'Project Manager', value: 'project_manager' },
  { label: 'Software Engineer', value: 'software_engineer' },
  { label: 'UX/UI Designer', value: 'ux_ui_designer' },
  { label: 'Data Analyst', value: 'data_analyst' },
  { label: 'Product Owner', value: 'product_owner' },
];

export const jobLevels = [
  { label: 'Intern', value: 'intern' },
  { label: 'Entry Level', value: 'entry_level' },
  { label: 'Mid Level', value: 'mid_level' },
  { label: 'Senior Level', value: 'senior_level' },
  { label: 'Lead', value: 'lead' },
  { label: 'Manager', value: 'manager' },
  { label: 'Director', value: 'director' },
  { label: 'Vice President', value: 'vice_president' },
  { label: 'C-Level Executive', value: 'c_level' },
  { label: 'Founder', value: 'founder' },
];

export const employmentTypes = [
  { label: 'Full-Time', value: 'full_time' },
  { label: 'Part-Time', value: 'part_time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Internship', value: 'internship' },
  { label: 'Temporary', value: 'temporary' },
];

export const userInfo = {
  personalInfo: {
    fullName: 'Regina Phalangi',
    maritalStatus: 'Single',
    birthPlace: 'Meerut',
    bloodType: 'O+',
    gender: 'female',
    religion: 'hindu',
    dateOfbirth: '2001-02-28',
    age: '24',
  },
  addressInfo: {
    current_address: '123 Oakwood Avenue, Suite 567, US',
    permanent_address: '123 Oakwood Avenue, Suite 567, US',
  },

  emergencyContact: {
    fullName: 'Mike Hannigan',
    relationShip: 'Husband',
    contact: '+91987654321',
    address: 'Brinkin vice city',
  },
  employmentInfo: {
    joiningDate: '2023-08-22',
    jobRole: 'project_manager',
    jobLevel: 'manager',
    employmentType: 'full_time',
    serviceYear: '2 Year 4 Months',
    employeeId: '#123APM',
    departmentJob: 'Operations',
    locationJob: 'Delhi, India',
    manager: 'Mr. Paul Win',
    currentProject: 'POV Website',
    status: 'Active',
  },
  contactInfo: {
    personalContact: '+919876543567',
    personalEmail: 'reginaphalangi@gmail.com',
    otherContact: null,
  },
  contractInfo: {
    contractId: '#ABC123',
    contractName: 'CRM System',
    contractType: 'On-site',
    startDate: '05 Aug 2023',
    endDate: '10 Jan 2025',
    status: 'Active',
  },

  status: 'Active',
  lastLogin: '12AM, Today',
  employeeId: '#123PAM',
  manager: 'Joey Tribbiani',
};

export const stopTimeTrackingData = {
  taskMode: 'In-Office',
  projectName: 'Website Revamp for E-Commerce',
  taskName: 'UI Design for Checkout Page',
  startDate: 'Dec 20, 2020',
  startTime: '10:00 AM',
  workDescription:
    'Designing the checkout page to enhance user experience and optimize for mobile responsiveness. Adding dynamic error handling for form validation.',
};

export const notifications = [
  {
    id: '1',
    avatar: '/path/to/emily-avatar.jpg',
    userName: 'Emily Tyler',
    action: 'sent you a comment in',
    task: 'Research',
    taskType: 'task',
    time: '2025-04-04T06:30:00Z',
  },
  {
    id: '2',
    avatar: '/path/to/avatar2.jpg',
    action: 'Updated the status of',

    task: 'Mind Map',
    taskType: 'task to',
    taskStatus: 'In Progress',
    time: '2025-04-04T02:30:00Z',
  },
  {
    id: '3',
    avatar: '/path/to/blake-avatar.jpg',
    userName: 'Blake Silva',
    action: 'assigned the issue in you',
    time: '2025-04-04T09:30:00Z',
  },
  {
    id: '4',
    avatar: '/path/to/emily-avatar.jpg',
    userName: 'Emily Tyler',
    action: 'sent you a comment in',
    task: 'Research',
    taskType: 'task',
    time: '2025-04-03T14:30:00Z',
  },
  {
    id: '5',
    avatar: '/path/to/avatar2.jpg',
    userName: 'Updated the status of',
    action: 'Mind Map',
    taskType: 'task to',
    taskStatus: 'In Progress',
    time: '2025-04-03T13:45:00Z',
  },
  {
    id: '6',
    avatar: '/path/to/blake-avatar.jpg',
    userName: 'Blake Silva',
    action: 'assigned the issue in you',
    time: '2024-09-12T10:54:00Z',
  },
  {
    id: '7',
    avatar: '/path/to/emily-avatar.jpg',
    userName: 'Emily Tyler',
    action: 'sent you a comment in',
    task: 'Research',
    taskType: 'task',
    time: '2024-09-12T09:05:00Z',
  },
];

export const payrollHistory = [
  {
    month: 'January',
    date: '06 January, 2023',
    netPay: '₹55,000',
    hike: '10%',
    netSalary: '₹55,000',
  },
  {
    month: 'July',
    date: '06 July, 2023',
    netPay: '₹55,000',
    hike: '0%',
    netSalary: '₹55,000',
  },
];
export const historysheetdata = [
  {
    date: 'MAR 24,2025',
    description: 'WORKED ON DESIGN WIREFRAMES(10:00AM-12:30PM)',
    timeago: '2hrs',
  },
  {
    date: 'MAR 24,2025',
    description: 'WORKED ON DESIGN WIREFRAMES(10:00AM-12:30PM)',
    timeago: '2hrs',
  },
  {
    date: 'MAR 24,2025',
    description: 'WORKED ON DESIGN WIREFRAMES(10:00AM-12:30PM)',
    timeago: '2hrs',
  },
  {
    date: 'MAR 24,2025',
    description: 'WORKED ON DESIGN WIREFRAMES(10:00AM-12:30PM)',
    timeago: '2hrs',
  },
  {
    date: 'MAR 24,2025',
    description: 'WORKED ON DESIGN WIREFRAMES(10:00AM-12:30PM)',
    timeago: '2hrs',
  },
  {
    date: 'MAR 24,2025',
    description: 'WORKED ON DESIGN WIREFRAMES(10:00AM-12:30PM)',
    timeago: '2hrs',
  },
  {
    date: 'MAR 24,2025',
    description: 'WORKED ON DESIGN WIREFRAMES(10:00AM-12:30PM)',
    timeago: '2hrs',
  },
];
export const calendersheet = [
  {
    label: 'jane cooper',
    title: 'Finance',
    duration: 'today',
    image: 'assets/janecooper.png',
  },
  {
    label: 'jane cooper',
    title: 'Marketing',
    duration: 'today',
    image: 'assets/janecooper.png',
  },
  {
    label: 'Leslie Alexander',
    title: 'Manager',
    duration: 'in 4 days',
    image: 'assets/lesliealexander.png',
  },
  {
    label: 'Esther howard',
    title: 'Manager',
    duration: 'in a week',
    image: 'assets/estherhoward.png',
  },
];
export const holidaydata = [
  {
    Occasion: 'Holi',
    Duration: 'Full Day',
    time: 'in a day',
  },
  {
    Occasion: 'Navratri',
    Duration: 'Full Day',
    time: 'in a week',
  },
  {
    Occasion: 'Janmashtmi',
    Duration: 'Full Day',
    time: 'in a month',
  },
  {
    Occasion: 'Diwali',
    Duration: 'Full Day',
    time: 'in a month',
  },
];
export const workanniversary = [
  {
    label: 'Esther howard',
    title: 'Manager',
    duration: '3 years',
    image: 'assets/estherhoward.png',
  },
];
