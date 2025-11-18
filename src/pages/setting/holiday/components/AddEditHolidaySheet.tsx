'use client';
import React, { useEffect, useState } from 'react';
import {
  Close,
  Drawer,
  Input,
  Typography,
  Button,
  Dropdown,
  DatePicker,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { HolidayType } from './HolidayList';
import { holidayTypeOptions, regionOptions } from '../mockData';
import { HolidayInfo } from '..';

type AddEditHolidaySheetProps = {
  showHolidaySheet: boolean;
  setShowHolidaySheet: (showHolidaySheet: boolean) => void;
  onAddHoliday: (newHoliday: HolidayInfo) => void;
  isEditHoliday?: boolean;
  selectedHolidayItem?: HolidayInfo | null;
};

export const allowedEmployeeType = [
  { label: 'All', value: 'all' },
  { label: 'Full Time', value: 'full-time' },
  { label: 'Part Time', value: 'part-time' },
  { label: 'Interns', value: 'intern' },
  { label: 'Contract Employee', value: 'contract-employee' },
];

const isMandatoryOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const initialHolidayValue: HolidayInfo = {
  name: '',
  date: null,
  type: '' as HolidayType,
  isMandatory: '',
  allowedEmployeeType: [],
  region: [],
};

type HolidayInfoKey = keyof HolidayInfo;

const AddEditHolidaySheet: React.FC<AddEditHolidaySheetProps> = ({
  showHolidaySheet,
  setShowHolidaySheet,
  onAddHoliday,
  isEditHoliday = false,
  selectedHolidayItem,
}) => {
  const [holidayInfo, setHolidayInfo] = useState<HolidayInfo>(initialHolidayValue);
  const [errors, setErrors] = useState({
    name: '',
    date: '',
    allowedEmployeeType: '',
    type: '',
    region: '',
    isMandatory: '',
  });

  useEffect(() => {
    if (selectedHolidayItem && isEditHoliday) {
      let isMandatoryUI = '';
      if (typeof selectedHolidayItem.isMandatory === 'boolean') {
        isMandatoryUI = selectedHolidayItem.isMandatory ? 'yes' : 'no';
      } else if (
        selectedHolidayItem.isMandatory === 'yes' ||
        selectedHolidayItem.isMandatory === 'no'
      ) {
        isMandatoryUI = selectedHolidayItem.isMandatory;
      }
      setHolidayInfo({ ...selectedHolidayItem, isMandatory: isMandatoryUI });
    } else {
      setHolidayInfo(initialHolidayValue);
    }
  }, [selectedHolidayItem, isEditHoliday]);

  const handleInputChange = (field: HolidayInfoKey, value: HolidayInfo[HolidayInfoKey]) => {
    if (field === 'date') {
      setHolidayInfo(prev => ({ ...prev, [field]: value as Date | null }));
    } else {
      setHolidayInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const validate = () => {
    const newErrors = {
      name: holidayInfo.name.trim() ? '' : 'Holiday name is required',
      date: holidayInfo.date ? '' : 'Holiday date is required',
      allowedEmployeeType:
        holidayInfo.allowedEmployeeType && holidayInfo.allowedEmployeeType.length > 0
          ? ''
          : 'Allowed employee type is required',
      type: holidayInfo.type ? '' : 'Holiday type is required',
      region: holidayInfo.region && holidayInfo.region.length > 0 ? '' : 'Region is required',
      isMandatory: holidayInfo.isMandatory ? '' : 'Mandatory selection is required',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(e => !e);
  };

  const handleSave = () => {
    if (!validate()) return;
    let isMandatoryField: object = {};
    if (holidayInfo.isMandatory === 'yes') isMandatoryField = { isMandatory: true };
    else if (holidayInfo.isMandatory === 'no') isMandatoryField = { isMandatory: false };
    const holidayToSave: HolidayInfo = {
      ...holidayInfo,
      ...isMandatoryField,
    };
    onAddHoliday(holidayToSave);
  };

  return (
    <Drawer
      isOpen={showHolidaySheet}
      onClose={() => setShowHolidaySheet(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col p-6 overflow-y-scroll"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setShowHolidaySheet(false)}
        >
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-4 my-8">
        <Typography tag="h3" className="font-semibold text-primary text-xl">
          {isEditHoliday ? 'Edit Holiday' : 'Add Holiday'}
        </Typography>

        <Input
          label="Holiday Name"
          type="text"
          placeholder="Enter Holiday Name"
          theme={{
            labelStyle: 'text-primaryText text-sm',
            inputStyle:
              'h-[50px] text-sm placeholder:text-[#7D8592] font-normal focus:border-primary rounded-xl',
          }}
          value={holidayInfo.name}
          onChange={e => handleInputChange('name', e.target.value)}
        />
        {errors.name && (
          <Typography tag="t5" className="text-[#E53935] text-xs mt-[-12px] ml-1">
            {errors.name}
          </Typography>
        )}

        <DatePicker
          className="w-full"
          label="Holiday Date"
          mode="single"
          placeholder="Enter holiday date"
          theme={{
            labelStyle: 'text-primaryText text-sm',
            inputStyle:
              'h-[50px] text-sm placeholder:text-[#7D8592] font-normal focus:border-primary rounded-xl',
          }}
          value={holidayInfo.date ?? undefined}
          onChange={date => {
            handleInputChange('date', new Date(date!));
          }}
        />
        {errors.date && (
          <Typography tag="t5" className="text-[#E53935] text-xs mt-[-12px] ml-1">
            {errors.date}
          </Typography>
        )}

        <Dropdown
          label="Allowed Employee Types"
          placeholder="Select eligible employee types"
          theme={{
            labelStyle: 'text-primaryText !mb-1 text-sm',
            inputStyle:
              'text-sm placeholder:text-sm placeholder:text-[#7D8592] focus:border-primary',
          }}
          options={allowedEmployeeType}
          selected={allowedEmployeeType.filter(opt =>
            holidayInfo.allowedEmployeeType.includes(opt.value)
          )}
          onChange={(selectedOptions: any) => {
            const values = Array.isArray(selectedOptions)
              ? selectedOptions.map((option: any) => option.value)
              : selectedOptions?.value
                ? [selectedOptions.value]
                : [];
            handleInputChange('allowedEmployeeType', values);
          }}
          multi
        />
        {errors.allowedEmployeeType && (
          <Typography tag="t5" className="text-[#E53935] text-xs mt-[-12px] ml-1">
            {errors.allowedEmployeeType}
          </Typography>
        )}

        <Dropdown
          label="Holiday Type"
          placeholder="Select a type"
          theme={{
            labelStyle: 'text-primaryText !mb-1 text-sm',
            inputStyle: 'text-sm placeholder:text-sm focus:border-primary',
          }}
          options={holidayTypeOptions}
          selected={holidayTypeOptions.find(opt => opt.value === holidayInfo.type)}
          onChange={e => {
            if (e?.value) {
              handleInputChange('type', e.value);
            }
          }}
        />
        {errors.type && (
          <Typography tag="t5" className="text-[#E53935] text-xs mt-[-12px] ml-1">
            {errors.type}
          </Typography>
        )}

        <Dropdown
          label="Region"
          placeholder="Select a region"
          theme={{
            labelStyle: 'text-primaryText !mb-1 text-sm',
            inputStyle: 'text-sm placeholder:text-sm focus:border-primary',
          }}
          options={regionOptions}
          selected={
            Array.isArray(holidayInfo.region)
              ? regionOptions.filter(option => holidayInfo.region.includes(option.value))
              : []
          }
          onChange={selectedOptions => {
            const values = Array.isArray(selectedOptions)
              ? selectedOptions.map(option => option.value)
              : [];
            handleInputChange('region', values);
          }}
          multi
        />
        {errors.region && (
          <Typography tag="t5" className="text-[#E53935] text-xs mt-[-12px] ml-1">
            {errors.region}
          </Typography>
        )}

        <Dropdown
          label="Is Mandatory?"
          placeholder="Select if holiday is mandatory"
          theme={{
            labelStyle: 'text-primaryText !mb-1 text-sm',
            inputStyle:
              'text-sm placeholder:text-sm placeholder:text-[#7D8592] focus:border-primary',
          }}
          options={isMandatoryOptions}
          selected={isMandatoryOptions.find(opt => opt.value === holidayInfo.isMandatory)}
          onChange={e => handleInputChange('isMandatory', e?.value || '')}
        />
        {errors.isMandatory && (
          <Typography tag="t5" className="text-[#E53935] text-xs mt-[-12px] ml-1">
            {errors.isMandatory}
          </Typography>
        )}
      </div>

      <div className="flex justify-end my-2">
        <Button onClick={handleSave} variant="primary" className="!rounded-2xl h-12 w-[194px]">
          {isEditHoliday ? 'Update Holiday' : 'Save Holiday'}
        </Button>
      </div>
    </Drawer>
  );
};

export default AddEditHolidaySheet;
