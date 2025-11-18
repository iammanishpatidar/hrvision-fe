import {
  Dropdown,
  Typography,
  Input,
  DatePicker,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { employmentTypes, jobRoles, userInfo } from '../../mockData';
import { useRef, useState } from 'react';

interface EmploymentOverviewProps {
  initialData?: typeof userInfo.employmentInfo;
}

const EmploymentOverview = ({ initialData = userInfo.employmentInfo }: EmploymentOverviewProps) => {
  const [employmentInfo, setEmploymentInfo] = useState(initialData);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setEmploymentInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl p-6 size-full h-[508px] shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Employment Overview
        </Typography>
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-2 w-1/2">
          <Input
            label="Employee ID"
            type="int"
            placeholder="#123ABC"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={employmentInfo.employeeId}
            onChange={e => handleInputChange('joiningDate', e.target.value)}
            disabled
            ref={inputRef}
          />
          <Input
            label="Service period"
            type="text"
            placeholder="Select joining date"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={employmentInfo.serviceYear}
            onChange={e => handleInputChange('joiningDate', e.target.value)}
            disabled
            ref={inputRef}
          />

          <DatePicker
            className="w-full"
            label="Joining Date"
            mode="single"
            placeholder="Select joining date"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={new Date(employmentInfo.joiningDate)}
            onChange={date => handleInputChange('joiningDate', new Date(date!))}
            disabled
          />

          <Dropdown
            label="Job Role"
            placeholder="Select your role"
            theme={{
              labelStyle: 'text-primaryText text-xs !mb-1',
              inputStyle:
                '!h-[35px] text-xs placeholder:text-xs focus:border-primary hover:cursor-default',
            }}
            options={jobRoles}
            selected={{
              label: employmentInfo.jobRole,
              value: employmentInfo.jobRole,
            }}
            onChange={e => {
              if (e?.value) {
                handleInputChange('jobRole', e.value);
              }
            }}
            formatValue
            disabled
          />
          <Input
            label="Current Project"
            type="text"
            placeholder="POV Website"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary ',
            }}
            value={employmentInfo.currentProject}
            onChange={e => handleInputChange('joiningDate', e.target.value)}
            disabled
            ref={inputRef}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <Input
            label=" Job Department"
            type="text"
            placeholder="Operations"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={employmentInfo.departmentJob}
            onChange={e => handleInputChange('departmentJob', e.target.value)}
            disabled
            ref={inputRef}
          />
          <Input
            label="Job Location"
            type="text"
            placeholder="Delhi, India"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={employmentInfo.locationJob}
            onChange={e => handleInputChange('locationJob', e.target.value)}
            disabled
            ref={inputRef}
          />
          <Input
            label="Manager"
            type="text"
            placeholder="Mr. Paul Win"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary ',
            }}
            value={employmentInfo.manager}
            onChange={e => handleInputChange('joiningDate', e.target.value)}
            disabled
            ref={inputRef}
          />

          <Dropdown
            label="Employment Type"
            placeholder="Select your employment type"
            theme={{
              labelStyle: 'text-primaryText text-xs !mb-1',
              inputStyle:
                '!h-[35px] text-xs placeholder:text-xs focus:border-primary hover:cursor-default',
            }}
            options={employmentTypes}
            selected={{
              label: employmentInfo.employmentType,
              value: employmentInfo.employmentType,
            }}
            onChange={e => {
              if (e?.value) {
                handleInputChange('employmentType', e.value);
              }
            }}
            formatValue
            disabled
          />
          <Input
            label="Status"
            type="text"
            placeholder="Active"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary ',
            }}
            value={employmentInfo.status}
            onChange={e => handleInputChange('joiningDate', e.target.value)}
            disabled
            ref={inputRef}
          />
        </div>
      </div>

      <div className="text-primary underline text-sm mt-3 font-normal flex items-center">
        {/* <Typography tag="t4" className="text-primary hover:cursor-pointer"> */}
        {/* View Documents */}
        {/* </Typography> */}
        {/* <ChevronRight size={14} color="#444291" /> */}
      </div>
    </div>
  );
};

export default EmploymentOverview;
