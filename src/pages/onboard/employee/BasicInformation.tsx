import React from 'react';
import { IEmployee } from '@/types';
import { DatePicker, Dropdown, Input } from '@fibonacci-innovative-solutions/hrms-design-library';
import {
  BLOOD_TYPE_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  RELIGION_OPTIONS,
} from '../constants';
import { useUser } from '@clerk/clerk-react';

interface Props {
  employee: IEmployee;
  setEmployee: (e: IEmployee) => void;
  triedSubmit: boolean;
}

const BasicInformation: React.FC<Props> = ({ employee, setEmployee, triedSubmit }) => {
  const { user } = useUser();

  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-full">
      <Input
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Full Name"
        value={user?.fullName || ''}
        disabled
      />

      <div className="flex flex-col">
        <Dropdown
          theme={{
            labelStyle: 'input-default text-secondaryText',
            inputStyle: 'h-input-default text-sm',
          }}
          label="Gender"
          options={GENDER_OPTIONS}
          selected={{ label: employee?.gender || '', value: employee?.gender || '' }}
          onChange={e => setEmployee({ ...employee, gender: e?.value } as IEmployee)}
          showError={triedSubmit && !employee?.gender}
          errorMessage="Please select gender"
          required
        />
        {triedSubmit && !employee?.gender && (
          <div className="text-red-500 text-xs mt-1">Please select gender</div>
        )}
      </div>

      <div className="flex flex-col">
        <DatePicker
          className="w-full"
          label="Date of Birth"
          mode="single"
          placeholder="Enter your birth date"
          theme={{
            labelStyle: 'input-default text-secondaryText',
            inputStyle: 'h-input-default text-sm',
          }}
          value={employee?.date_of_birth ? new Date(employee?.date_of_birth) : undefined}
          onChange={date => setEmployee({ ...employee, date_of_birth: date! } as IEmployee)}
          required
          disableFuture
          fromYear={new Date().getFullYear() - 40}
          toYear={new Date().getFullYear()}
        />
        {triedSubmit && !employee?.date_of_birth && (
          <div className="text-red-500 text-xs mt-1">Please select date of birth</div>
        )}
      </div>
      <div className="flex flex-col">
        <Dropdown
          theme={{
            labelStyle: 'input-default text-secondaryText',
            inputStyle: 'h-input-default text-sm',
          }}
          label="Marital Status"
          options={MARITAL_STATUS_OPTIONS}
          selected={{
            label: employee?.marital_status || '',
            value: employee?.marital_status || '',
          }}
          onChange={e => setEmployee({ ...employee, marital_status: e?.value } as IEmployee)}
          required
          showError={triedSubmit && !employee?.marital_status}
          errorMessage="Please select marital status"
        />
        {triedSubmit && !employee?.marital_status && (
          <div className="text-red-500 text-xs mt-1">Please select marital status</div>
        )}
      </div>

      <Dropdown
        searchable={true}
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Blood Type"
        options={BLOOD_TYPE_OPTIONS}
        selected={{ label: employee?.blood_group || '', value: employee?.blood_group || '' }}
        onChange={e => setEmployee({ ...employee, blood_group: e?.value } as IEmployee)}
      />

      <Dropdown
        searchable={true}
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Religion"
        options={RELIGION_OPTIONS}
        selected={{ label: employee?.religion || '', value: employee?.religion || '' }}
        onChange={e => setEmployee({ ...employee, religion: e?.value } as IEmployee)}
      />
    </div>
  );
};

export default BasicInformation;
