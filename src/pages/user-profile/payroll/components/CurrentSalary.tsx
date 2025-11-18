import {
  Input,
  Typography,
  Button,
  Pen,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { UserProfileService } from '@/apis/services/UserprofileService';
import useAdminStore from '@/store/admin-store';

export type CurrentSalaryType = {
  id: string;
  employee_id: string;
  base_salary: string;
  base_rate_period: string;
  salary_schedule: string;
  total_allowance: string;
  net_salary: string;
  currency?: string;
};

const CurrentSalary = ({ currentSalary }: { currentSalary: CurrentSalaryType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [salaryDetails, setSalaryDetails] = useState(currentSalary);
  const [errorMessage, setErrorMessage] = useState('');
  const { onboardingDetails } = useAdminStore();

  useEffect(() => {
    setSalaryDetails(currentSalary);
  }, [currentSalary]);

  const validateForm = () => {
    let message = '';
    if (!salaryDetails.base_salary) message = 'Base salary is required';
    else if (!salaryDetails.base_rate_period) message = 'Base rate period is required';
    else if (!salaryDetails.salary_schedule) message = 'Salary schedule is required';
    else if (!salaryDetails.total_allowance) message = 'Total allowance is required';
    else if (!salaryDetails.net_salary) message = 'Net salary is required';
    setErrorMessage(message);
    return message;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CurrentSalaryType) => {
      const payload = {
        employee_id: onboardingDetails?.employeeData?.id,
        base_salary: Number(data.base_salary),
        base_rate_period: data.base_rate_period,
        salary_schedule: data.salary_schedule,
        total_allowance: Number(data.total_allowance),
        net_salary: Number(data.net_salary),
        currency: data.currency || 'USD',
      };
      return await UserProfileService.updateCurrentSalary(payload, currentSalary.id);
    },
    onSuccess: () => {
      setIsEditing(false);
      setErrorMessage('');
    },
    onError: (error: any) => {
      const beErrors = error?.response?.data?.data;
      if (beErrors && typeof beErrors === 'object') {
        const firstErrorKey = Object.keys(beErrors)[0];
        const message = beErrors[firstErrorKey];
        setErrorMessage(message);
      } else {
        setErrorMessage('Failed to update salary.');
      }
    },
  });

  const handleSave = () => {
    const error = validateForm();
    if (error) return;
    mutate(salaryDetails);
  };

  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Current Salary
        </Typography>
        <div className="h-8 hover:cursor-pointer">
          {isEditing ? (
            <Button
              variant="primary"
              className="min-w-[70px] h-[28px] hover:cursor-pointer"
              onClick={handleSave}
              disabled={isPending}
            >
              Save
            </Button>
          ) : (
            <div onClick={() => setIsEditing(true)} className="hover:bg-gray-200 p-1.5 rounded-lg">
              <Pen height="22" width="22" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="Base Salary"
          type="number"
          placeholder="Enter salary"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value={salaryDetails?.base_salary ?? ''}
          onChange={e => setSalaryDetails({ ...salaryDetails, base_salary: e.target.value })}
          disabled={!isEditing}
        />
        <Input
          label="Base Rate Period"
          type="text"
          placeholder="Enter base rate period"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value={salaryDetails?.base_rate_period ?? ''}
          onChange={e => setSalaryDetails({ ...salaryDetails, base_rate_period: e.target.value })}
          disabled={!isEditing}
        />
        <Input
          label="Salary Schedule"
          type="text"
          placeholder="Enter salary schedule"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value={salaryDetails?.salary_schedule ?? ''}
          onChange={e => setSalaryDetails({ ...salaryDetails, salary_schedule: e.target.value })}
          disabled={!isEditing}
        />
        <Input
          label="Total Allowance"
          type="number"
          placeholder="Enter total allowance"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value={salaryDetails?.total_allowance ?? ''}
          onChange={e => setSalaryDetails({ ...salaryDetails, total_allowance: e.target.value })}
          disabled={!isEditing}
        />
        <Input
          label="Net Salary"
          type="number"
          placeholder="Enter net salary"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value={salaryDetails?.net_salary ?? ''}
          onChange={e => setSalaryDetails({ ...salaryDetails, net_salary: e.target.value })}
          disabled={!isEditing}
        />
        {/* Optionally add currency input if you want to allow editing currency */}
        {errorMessage && <p className="text-xs text-red-500 mb-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CurrentSalary;
