'use client';

import {
  Close,
  Drawer,
  Input,
  Typography,
  Button,
  Dropdown,
  Textarea,
  FileUpload,
  ToggleButton,
  DatePicker,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';

const policyType = [
  { label: 'HR Policy', value: 'hr_policy' },
  { label: 'Leave Policy', value: 'leave_policy' },
  { label: 'IT Policy', value: 'it_policy' },
];

const departmentOptions = [
  { label: 'Select department', value: '' },
  { label: 'IT', value: 'IT' },
  { label: 'HR', value: 'HR' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Admin', value: 'Admin' },
];

const visibleToOptions = [
  { label: 'All', value: 'All' },
  { label: 'HR Only', value: 'HR Only' },
  { label: 'IT Only', value: 'IT Only' },
];

type AddPolicySideSheetProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddPolicySideSheet = ({ isOpen, setIsOpen }: AddPolicySideSheetProps) => {
  const [isEditing] = useState(false);
  const [policyInfo, setPolicyInfo] = useState({
    jobRole: '',
    department: '',
    policyTitle: '',
    policyType: '',
    policyDescription: '',
    effectiveFrom: '',
    effectiveTill: '',
    visibleTo: '',
    uploadDocuments: null,
    acknowledgement: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setPolicyInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-between pl-6 py-6 pr-3 overflow-y-auto"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setIsOpen(false)}
        >
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        <Typography tag="h3" className="font-semibold text-primary text-xl pt-4">
          Add new Policy
        </Typography>

        <Input
          label="Policy Title"
          type="text"
          placeholder="HR Policy"
          theme={{
            labelStyle: 'text-primaryText ',
            inputStyle:
              'h-[50px] text-sm placeholder:text-primaryText font-normal focus:border-primary rounded-xl',
          }}
          value=""
          onChange={e => handleInputChange('policyTitle', e.target.value)}
          disabled={!isEditing}
        />

        <Dropdown
          label="Policy Type"
          placeholder="Select your role"
          theme={{
            labelStyle: 'text-primaryText  !mb-1',
            inputStyle: `h-[35px] text-xs placeholder:text-xs focus:border-primary ${!isEditing ? 'hover:cursor-default' : ''}`,
          }}
          options={policyType}
          selected={{
            label: policyInfo.policyType,
            value: policyInfo.policyType,
          }}
          onChange={e => {
            if (e?.value) {
              handleInputChange('policyType', e.value);
            }
          }}
          formatValue
          disabled={!isEditing}
        />
        <Dropdown
          label="Department (Optional)"
          placeholder="Select your role"
          theme={{
            labelStyle: 'text-primaryText  !mb-1',
            inputStyle: `h-[35px] text-xs placeholder:text-xs focus:border-primary ${!isEditing ? 'hover:cursor-default' : ''}`,
          }}
          options={departmentOptions}
          selected={{
            label: policyInfo.department,
            value: policyInfo.department,
          }}
          onChange={e => {
            if (e?.value) {
              handleInputChange('department', e.value);
            }
          }}
          formatValue
          disabled={!isEditing}
        />
        <div>
          <label className="  text-primaryText block mb-1">Policy Description</label>
          <Textarea
            onChange={() => {}}
            placeholder="Enter policy description"
            description={policyInfo.policyDescription}
            textareaClassName="w-full"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <DatePicker
            className="text-primaryText"
            label="Effective From"
            mode="single"
            theme={{ labelStyle: 'text-primaryText' }}
            onChange={() => {}}
          />
          <DatePicker
            className="text-primaryText"
            label="Effective Till"
            mode="single"
            theme={{ labelStyle: 'text-primaryText' }}
            onChange={() => {}}
          />
        </div>

        <Dropdown
          label="Visible To"
          placeholder="Select your role"
          theme={{
            labelStyle: 'text-primaryText  !mb-1',
            inputStyle: `h-[35px] text-xs placeholder:text-xs focus:border-primary ${!isEditing ? 'hover:cursor-default' : ''}`,
          }}
          options={visibleToOptions}
          selected={{
            label: policyInfo.visibleTo,
            value: policyInfo.visibleTo,
          }}
          onChange={e => {
            if (e?.value) {
              handleInputChange('visibleTo', e.value);
            }
          }}
          formatValue
          disabled={!isEditing}
        />

        <div>
          <label className="  text-primaryText block mb-1">Upload Documents</label>
          <FileUpload className="w-full text-primaryText" />
        </div>

        <div className="flex items-center justify-between mt-2">
          <label className="  text-primaryText block ">Acknowledgement required</label>
          <ToggleButton
            isOn={policyInfo.acknowledgement}
            onToggle={() => handleInputChange('acknowledgement', !policyInfo.acknowledgement)}
            size="sm"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 pr-2">
        <Button variant="primary" className="rounded-full px-6 py-2">
          Add Policy
        </Button>
      </div>
    </Drawer>
  );
};

export default AddPolicySideSheet;
