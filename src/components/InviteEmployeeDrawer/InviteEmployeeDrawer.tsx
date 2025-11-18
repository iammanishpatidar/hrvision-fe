import {
  Button,
  DatePicker,
  Drawer,
  Dropdown,
  ImageUploader,
  Input,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import React, { useEffect, useState } from 'react';
import { handleToast } from '@/utils/toastUtils';
import useAdminStore from '@/store/admin-store';
import crossIcon from '../../../assets/temp/crossIcon.svg';
import { EMPLOYEE_STATUS_OPTIONS, PAY_RATE_PERIOD } from '../../pages/onboard/constants';
import { EmployeeService } from '@/apis/services/EmployeeService';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' },
];

interface InviteEmployeeDrawerProps {
  isOpen: boolean;
  toggleDrawer: (sheetName: string) => void;
  onClose: (sheetName: string) => void;
}

const InviteEmployeeDrawer: React.FC<InviteEmployeeDrawerProps> = ({
  isOpen,
  toggleDrawer,
  onClose,
}) => {

  interface InviteEmployeePayload {
    role_id: any;
    admin_id: string;
    business_id: string;
    department_id: any;
    name: string;
    email: string;
    pay_rate: string;
    pay_rate_period: any;
    employment_status: any;
    designation_id: any;
    hire_date: Date | undefined;
    manager: string;
    gender: any;
  }
  const [roles, setRoles] = React.useState([]);
  const [designations, setDesignations] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);

  const {onboardingDetails} = useAdminStore();
 
  const userId = onboardingDetails?.employeeData.id
  

  useEffect(() => {
    async function fetchRolesAndDesignations() {
      try {
        const [rolesResponse, designationsResponse, departmentsResponse] = await Promise.all([
          EmployeeService.getAllRoles(),
          EmployeeService.getAllDesignations(),
          EmployeeService.getAllDepartments(),
        ]);
        let rolesData = rolesResponse.data;
        let designationsData = designationsResponse.data;
        let departmentsData = departmentsResponse.data;

        if (rolesData.length > 0 && designationsData.length > 0 && departmentsData.length > 0) {
          setRoles(rolesData.map((role) => ({
            label: role.role.charAt(0).toUpperCase() + role.role.slice(1).toLowerCase(),
            value: role.id
          })));
          setDesignations(designationsData.map((designation) => ({
            label: designation.designation,
            value: designation.id
          })))
          setDepartments(departmentsData.map((department) => ({
            label: department.department,
            value: department.id
          })))
        }

      } catch (err) {
        return;
      }
    }
    fetchRolesAndDesignations();
  }, []);

  const handleSubmit = async () => {
      const { role_id, name, department_id, email, pay_rate, pay_rate_period, employment_status, designation_id, hire_date, manager, gender } = formData;

      // Basic validation
      if (!name || !email || !pay_rate) {
        handleToast({ message: 'Name, Email, and payRate are required.', status: 'error' });
        return;
      }

      try {
        const adminStoreStr = localStorage.getItem('admin-store');
        let admin_id = '';
        let business_id = '';

        if (adminStoreStr) {
          const adminStore = JSON.parse(adminStoreStr);
          admin_id = adminStore.state.onboardingDetails.employeeData.id;
          business_id = adminStore.state.onboardingDetails.businessData.id;
        } else {
          console.log('No admin data found in localStorage');
        }
        const inviteEmployeePayload = {
          role_id: role_id.value,
          admin_id: admin_id,
          business_id: business_id,
          department_id: department_id.value,
          name,
          email,
          pay_rate: Number(pay_rate),
          pay_rate_period: pay_rate_period.label,
          employment_status: employment_status.label,
          designation_id: designation_id.value,
          hire_date: hire_date ? new Date(hire_date).toISOString().split('T')[0] : null,
          manager,
          ...(gender && { gender: gender.value }),
        };


        handleToast({ message: 'Employee invited successfully!', status: 'success' });
        onClose('EmployeeInvite');
      } catch (error: any) {
        console.error('Invite error:', error);
        const message =
          error?.response?.data?.message || 'Something went wrong while inviting the employee.';
        handleToast({ message, status: 'error' });
      }
  };

  const [formData, setFormData] = useState<InviteEmployeePayload>({
    admin_id: '',
    role_id: '',
    business_id: '',
    department_id: '',
    name: '',
    email: '',
    pay_rate: '',
    pay_rate_period: '',
    employment_status: '',
    designation_id: '',
    hire_date: new Date,
    manager: '',
    gender: '',
  });

  
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => onClose('EmployeeInvite')}
      position="right"
      width="450px"
      className="p-6 rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto"
    >
      <div className="relative flex flex-col gap-4 justify-center items-center h-full">
        <img
          src={crossIcon}
          alt="crossIcon"
          className="w-11 h-11 absolute top-0 right-0 cursor-pointer"
          onClick={() => toggleDrawer('EmployeeInvite')}
        />
        <Typography tag="h3" className="text-primary text-left w-full mt-10">
          Add Employee
        </Typography>
        <div className="w-full overflow-y-auto flex flex-col gap-[10px]">
          <div className='flex flex-col justify-center items-center'>
            <ImageUploader key={1} onChange={() => {}} />
          </div>
          <Input
            theme={{
              labelStyle: 'text-primaryText text-sm',
            }}
            label="Name"
            placeholder="John Doe"
            className="w-full"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <Input
            theme={{
              labelStyle: 'text-primaryText text-sm',
            }}
            label="Email Address"
            placeholder="johndoe@gmail.com"
            className="w-full"
            type="text"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <Dropdown
            theme={{
              labelStyle: 'text-primaryText text-sm',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Role"
            placeholder="Select Role"
            options={roles}
            onChange={(value) => handleChange('role_id', value)}
          />
          <Dropdown
            theme={{
              labelStyle: 'text-primaryText text-sm',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Department"
            placeholder="Select Department"
            options={departments}
            onChange={(value) => handleChange('department_id', value)}
          />
          <Dropdown
            theme={{
              labelStyle: 'text-primaryText text-sm',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Gender"
            placeholder="Select Gender"
            options={GENDER_OPTIONS}
            onChange={(value) => handleChange('gender', value)}
          />
          <Input
            theme={{
              labelStyle: 'text-primaryText text-sm',
            }}
            label="Pay Rate"
            placeholder="5000"
            className="w-full"
            type="text"
            value={formData.pay_rate}
            onChange={(e) => handleChange('pay_rate', e.target.value)}
          />
          <Dropdown
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Pay Rate Period"
            placeholder="Enter Pay Rate Period"
            options={PAY_RATE_PERIOD}
            onChange={(value) => handleChange('pay_rate_period', value)}
          />
          <DatePicker
            className="w-full"
            label="Hire Date"
            mode="single"
            placeholder="Select Hire Date"
            theme={{
              labelStyle: 'text-primaryText text-sm',
            }}
            value={undefined}
            // onChange={() => {}}
            onChange={(date) => handleChange('hire_date', date)}
          />
          <Dropdown
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Employee Designation"
            placeholder="Select Employee Status"
            options={designations}
            onChange={(value) => handleChange('designation_id', value)} 
          />
          <Dropdown
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Employee Status"
            placeholder="Select Employee Status"
            options={EMPLOYEE_STATUS_OPTIONS}
            onChange={(value) => handleChange('employment_status', value)}
          />
          <Input
            theme={{
              labelStyle: 'text-primaryText text-sm',
            }}
            label="Manager"
            placeholder="Enter Manager Name"
            className="w-full"
            type="text"
            value={formData.manager}
            onChange={(e) => handleChange('manager', e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center w-full gap-4">
          <Button variant="outline" type="button">
            Clear
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Invite
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default InviteEmployeeDrawer;
