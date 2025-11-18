import { CompanyTeamSizeEnum, StatusEnum } from './enums';

// Base model

export interface IBaseModel {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

// Address model

export interface IAddress extends IBaseModel {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

// EmployeeInvitation model

export interface IEmployeeInvitation extends IBaseModel {
  businessId: string;
  email: string;
  adminId: string;
  status: StatusEnum;
  // Relationships
  business?: ICompany;
  admin?: IEmployee;
}

// Compensation model

export interface ICompensation extends IBaseModel {
  business_id: string;
  fixed_pay: number;
  fixed_pay_schedule: string;
  allowance_id?: string;
  bonus_id?: string;
  currency: string;
  business?: ICompany;
}

// Company model

export interface ICompany extends IBaseModel {
  name: string;
  domain_name: string;
  email?: string;
  contact_number?: string;
  address_id?: string;
  website?: string;
  business_sector: string;
  team_size: CompanyTeamSizeEnum;
  // Relationships could be included as optional properties
  address?: IAddress;
  employees?: IEmployee[];
  invitations?: IEmployeeInvitation[];
}

// Employee model

export interface IEmployee extends IBaseModel {
  name: string;
  gender: string;
  date_of_birth: Date;
  marital_status: string;
  blood_group: string;
  religion: string;
  contact_number: string;
  email: string;
  permanent_address: IAddress;
  current_address: IAddress;
  emergency_contact?: IEmployeeEmergencyContact;
}

// EmergencyContact model

export interface IEmployeeEmergencyContact extends IBaseModel {
  name?: string;
  relationship?: string;
  contact_number?: string;
  address_id?: string;
  // Relationships
  address?: IAddress;
}

export interface ProfileDataTypes {
  firstName: string;
  image: string;
  title: string;
  lastName: string;
  location: string;
}

export interface CelebrationDataTypes {
  image: string;
  person: string;
  Designation: string;
}

// Onboarding Details response types

interface IOnboardingDetailsAddressData {
  id: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipcode: number;
  country: string;
  created_at: Date;
  updated_at: Date;
}

interface IOnboardingDetailsBusinessData {
  id: string;
  name: string;
  logo: string | null;
  email: string;
  contact_number: string;
  address_id: string;
  website: string;
  business_sector: string;
  primary_color: string;
  secondary_color: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  time_off_cycle_start_date: string;
  time_off_cycle_end_date: string;
}

interface IOnboardingDetailsRoleData {
  id: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface IOnboardingDetailsEmergencyContactData {
  id: string;
  name: string;
  relationship: string;
  contact_number: string;
  address_id: string;
  employee_id: string;
  created_at: Date;
  address: IOnboardingDetailsAddressData;
}

interface IOnboardingDetailsEmployeeData {
  id: string;
  clerk_id: string;
  name: string;
  employee_id: string | null;
  email: string;
  contact_number: string;
  permanent_address_id: string;
  current_address_id: string;
  business_id: string;
  marital_status: string;
  gender: string;
  religion: string;
  date_of_birth: Date;
  date_of_hire: Date | null;
  designation: string | null;
  is_active: boolean;
  blood_group: string;
  manager_id: string | null;
  employment_type: string | null;
  last_working_date: Date | null;
  department_id: string | null;
  role_id: string;
  location_id: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  permanent_address: IOnboardingDetailsAddressData;
  business: IOnboardingDetailsBusinessData;
  role: IOnboardingDetailsRoleData;
  department: string | null;
  emergency_contact: IOnboardingDetailsEmergencyContactData | null;
  location: string | null;
  manager: IOnboardingDetailsEmployeeData | null;
  current_address: IOnboardingDetailsAddressData;
  invited: boolean | false;
}

export interface IOnboardingDetails {
  businessData: IOnboardingDetailsBusinessData;
  employeeData: IOnboardingDetailsEmployeeData;
}

export interface IAllWorkingDays extends IBaseModel {
  id?: string;
  day: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface Asset {
  id: string;
  name: string;
  serial_number: string;
  business_id: string;
  asset_type: string;
  assigned_date: string;
  category_id: string;
  current_status: string;
  condition: string;
  warranty_expiry: string;
  license_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category: Category;
}

export interface CategoriesResponse {
  statusCode: number;
  data: {
    categories: Category[];
  };
  message: string;
}

export interface AssetsResponse {
  statusCode: number;
  data: [];
  message: string;
}
