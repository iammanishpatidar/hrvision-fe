'use client';

import {
  Close,
  Drawer,
  Input,
  Typography,
  Button,
  Dropdown,
  ToggleButton,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useEffect, useState } from 'react';
import { TimeOffColumnType } from './constants';
import { LeaveTypesService } from '@/apis/services/LeaveTypesService';
import useAdminStore from '@/store/admin-store';

const leaveForwardOptions = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

const genderOptions = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
];

const allowedEmployeeTypes = [
  { label: 'Full Time', value: 'Full-time' },
  { label: 'Part Time', value: 'Part-time' },
  { label: 'Interns', value: 'Interns' },
];

type AddEditTimeOffSheetProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEditTimeOff: boolean;
  selectedMenuRow?: TimeOffColumnType | null;
  onAddTimeOff?: (timeOff: TimeOffColumnType) => void;
  onRefreshLeaveTypes?: () => void;
};

const initialTimeOffValue: TimeOffColumnType = {
  id: '',
  name: '',
  max_leaves: 0,
  is_carry_forward_allowed: false,
  is_approval_required: false,
  allowed_genders: [],
  allowed_employee_type: [],
  business_id: '',
};

const AddEditTimeOffSheet = ({
  isOpen,
  setIsOpen,
  isEditTimeOff = false,
  selectedMenuRow,
  onAddTimeOff,
  onRefreshLeaveTypes,
}: AddEditTimeOffSheetProps) => {
  const [timeOffInfo, setTimeOffInfo] = useState<TimeOffColumnType>(initialTimeOffValue);
  const { onboardingDetails } = useAdminStore();

  useEffect(() => {
    if (selectedMenuRow && isEditTimeOff) {
      setTimeOffInfo(selectedMenuRow);
    } else {
      setTimeOffInfo(initialTimeOffValue);
    }
    console.log('selectedMenuRow', selectedMenuRow);
  }, [selectedMenuRow, isEditTimeOff, isOpen]);

  const handleClose = () => {
    setTimeOffInfo(initialTimeOffValue);
    setIsOpen(false);
  };

  const handleInputChange = (
    field: keyof TimeOffColumnType,
    value: string | boolean | string[]
  ) => {
    setTimeOffInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: timeOffInfo.name,
        max_leaves: timeOffInfo.max_leaves,
        is_carry_forward_allowed: timeOffInfo.is_carry_forward_allowed,
        is_approval_required: timeOffInfo.is_approval_required,
        allowed_genders: Array.isArray(timeOffInfo.allowed_genders)
          ? timeOffInfo.allowed_genders
          : [timeOffInfo.allowed_genders],
        allowed_employee_type: Array.isArray(timeOffInfo.allowed_employee_type)
          ? timeOffInfo.allowed_employee_type
          : [timeOffInfo.allowed_employee_type],
        business_id: onboardingDetails?.businessData?.id,
      };

      let response;

      if (isEditTimeOff && selectedMenuRow?.id) {
        const updatePayload = {
          ...payload,
        };
        response = await LeaveTypesService.updateLeaveType(selectedMenuRow.id, updatePayload);
        console.log('Leave type updated successfully:', response);
      } else {
        response = await LeaveTypesService.addLeaveType(payload);
        console.log('Leave type added successfully:', response);
      }
      console.log('response', selectedMenuRow);
      console.log(' id: response?.id ', response?.id);

      // Refresh leave types after successful add/update
      if (onRefreshLeaveTypes) {
        onRefreshLeaveTypes();
      }

      const timeOffToSave: TimeOffColumnType = {
        ...timeOffInfo,
        id: isEditTimeOff ? timeOffInfo.id : Date.now().toString(),
      };

      if (onAddTimeOff) {
        onAddTimeOff(timeOffToSave);
      }

      handleClose();
    } catch (error) {
      console.error('Error saving leave type:', error);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col p-6"
    >
      <div className="flex justify-end">
        <div className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]" onClick={handleClose}>
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-4 my-8">
        <Typography tag="h3" className="font-semibold text-primary text-xl">
          {isEditTimeOff ? 'Edit Time Off Type' : 'Add Time Off Type'}
        </Typography>

        <Input
          label="Time Off Name"
          type="text"
          placeholder="Enter time off type name"
          theme={{
            labelStyle: 'text-primaryText text-sm',
            inputStyle:
              'h-[50px] text-sm placeholder:text-[#7D8592] font-normal focus:border-primary rounded-xl',
          }}
          value={timeOffInfo.name}
          onChange={e => handleInputChange('name', e.target.value)}
        />

        <Input
          label="Number of Days"
          type="text"
          placeholder="Enter number of paid days"
          theme={{
            labelStyle: 'text-primaryText text-sm',
            inputStyle:
              'h-[50px] text-sm placeholder:text-[#7D8592] font-normal focus:border-primary rounded-xl',
          }}
          value={timeOffInfo.max_leaves.toString()}
          onChange={e => handleInputChange('max_leaves', e.target.value)}
        />

        <Dropdown
          label="Is Carried Forward?"
          placeholder="Select if leaves can be carried forward"
          theme={{
            labelStyle: 'text-primaryText !mb-1 text-sm',
            inputStyle:
              'text-sm placeholder:text-sm placeholder:text-[#7D8592] focus:border-primary',
          }}
          options={leaveForwardOptions}
          selected={leaveForwardOptions.find(
            opt => opt.value === timeOffInfo.is_carry_forward_allowed.toString()
          )}
          onChange={e => handleInputChange('is_carry_forward_allowed', e?.value || '')}
        />

        <Dropdown
          label="Allowed Genders"
          placeholder="Select gender eligibility"
          theme={{
            labelStyle: 'text-primaryText !mb-1 text-sm',
            inputStyle:
              'text-sm placeholder:text-sm placeholder:text-[#7D8592] focus:border-primary',
          }}
          options={genderOptions}
          selected={genderOptions.filter(opt => timeOffInfo.allowed_genders.includes(opt.value))}
          onChange={e => handleInputChange('allowed_genders', e?.map(option => option.value) || [])}
          multi={true}
        />

        <Dropdown
          label="Allowed Employee Types"
          placeholder="Select eligible employee types"
          theme={{
            labelStyle: 'text-primaryText !mb-1 text-sm',
            inputStyle:
              'text-sm placeholder:text-sm placeholder:text-[#7D8592] focus:border-primary',
          }}
          options={allowedEmployeeTypes}
          selected={allowedEmployeeTypes.filter(opt =>
            timeOffInfo.allowed_employee_type.includes(opt.value)
          )}
          onChange={e =>
            handleInputChange('allowed_employee_type', e?.map(option => option.value) || [])
          }
          multi={true}
        />

        <div className="flex items-center justify-between mt-2">
          <label className="text-primaryText block text-sm">Acknowledgement required</label>
          <ToggleButton
            isOn={timeOffInfo.is_approval_required}
            onToggle={() =>
              handleInputChange('is_approval_required', !timeOffInfo.is_approval_required)
            }
            size="sm"
          />
        </div>
      </div>

      <div className="flex justify-end my-2">
        <Button onClick={handleSave} variant="primary" className="!rounded-2xl h-12 w-[184px]">
          {isEditTimeOff ? 'Update Time Off' : 'Save Time Off'}
        </Button>
      </div>
    </Drawer>
  );
};

export default AddEditTimeOffSheet;
