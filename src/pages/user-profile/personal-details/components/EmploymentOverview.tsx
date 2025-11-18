import {
  Dropdown,
  Typography,
  Button,
  Pen,
  DatePicker,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { employmentTypes, jobLevels, jobRoles, userInfo } from '../../mockData';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface EmploymentOverviewProps {
  initialData?: typeof userInfo.employmentInfo;
}

const EmploymentOverview = ({ initialData = userInfo.employmentInfo }: EmploymentOverviewProps) => {
  const [employmentInfo, setEmploymentInfo] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    // TODO: Add save functionality
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setEmploymentInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Employment Overview
        </Typography>
        <div className="h-8 hover:cursor-pointer">
          {isEditing ? (
            <Button
              variant="primary"
              className="min-w-[70px] h-[28px] hover:cursor-pointer"
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="hover:bg-custom-blue-v2 p-1.5 rounded-lg"
            >
              <Pen height="22" width="22" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div ref={inputRef}>
          <DatePicker
            className="w-full"
            label="Joining Date"
            mode="single"
            placeholder="Select joining date"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: 'h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={new Date(employmentInfo.joiningDate)}
            onChange={date => {
              handleInputChange('dateOfbirth', date);
            }}
            disabled={!isEditing}
          />
        </div>
        <Dropdown
          label="Job Role"
          placeholder="Select your role"
          theme={{
            labelStyle: 'text-primaryText text-xs !mb-1',
            inputStyle: `h-[35px] text-xs placeholder:text-xs focus:border-primary ${!isEditing ? 'hover:cursor-default' : ''}`,
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
          disabled={!isEditing}
        />
        <Dropdown
          label="Job Level"
          placeholder="Select your level"
          theme={{
            labelStyle: 'text-primaryText text-xs !mb-1',
            inputStyle: `h-[35px] text-xs placeholder:text-xs focus:border-primary ${!isEditing ? 'hover:cursor-default' : ''}`,
          }}
          options={jobLevels}
          selected={{
            label: employmentInfo.jobLevel,
            value: employmentInfo.jobLevel,
          }}
          onChange={e => {
            if (e?.value) {
              handleInputChange('jobLevel', e.value);
            }
          }}
          formatValue
          disabled={!isEditing}
        />
        <Dropdown
          label="Employment Type"
          placeholder="Select your employment type"
          theme={{
            labelStyle: 'text-primaryText text-xs !mb-1',
            inputStyle: `h-[35px] text-xs placeholder:text-xs focus:border-primary ${!isEditing ? 'hover:cursor-default' : ''}`,
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
          disabled={!isEditing}
        />
      </div>

      <div className="text-primary underline text-sm mt-3 font-normal flex items-center">
        <Typography tag="t4" className="text-primary hover:cursor-pointer">
          View Documents
        </Typography>
        <ChevronRight size={14} color="#444291" />
      </div>
    </div>
  );
};

export default EmploymentOverview;
