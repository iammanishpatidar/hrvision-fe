export interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  role: string;
  joiningDate: string;
  contractType: string;
  avatar?: string;
  inactive?: boolean;
}

export interface TableHeaderProps {
  title?: React.ReactNode;
  totalCount?: number;
  totalCountLabel?: string;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  className?: string;
  rightContent?: React.ReactNode;
  showSearch?: boolean;
}
