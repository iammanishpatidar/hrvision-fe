import {
  Button,
  Close,
  DatePicker,
  Drawer,
  Dropdown,
  Input,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';
import { DEPARTMENT_OPTIONS } from '../mockData';

interface AddOfficerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddOfficerSheet: React.FC<AddOfficerSheetProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-between p-6 overflow-y-auto"
    >
      <div>
        <div className="flex justify-end">
          <div className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]" onClick={onClose}>
            <Close />
          </div>
        </div>
        <div className="flex flex-col gap-6 px-6 pb-6">
          <Typography tag="h3" className="text-primary">
            Add Relief Officer
          </Typography>
          <Input
            theme={{
              labelStyle: 'text-primaryText text-sm !font-medium',
              inputStyle: 'h-12 text-sm font-normal',
            }}
            label="Name"
            placeholder="Enter Officer Name"
            className="w-full"
            type="text"
          />
          <Input
            theme={{
              labelStyle: 'text-primaryText text-sm !font-medium',
              inputStyle: 'h-12 text-sm font-normal',
            }}
            label="Email"
            placeholder="Enter Officer Email"
            className="w-full"
            type="email"
          />
          <Dropdown
            theme={{
              labelStyle: 'input-default text-sm font-medium text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Department"
            options={DEPARTMENT_OPTIONS}
          />
          <DatePicker
            className="text-primaryText"
            label="Effective From"
            mode="single"
            theme={{ labelStyle: 'text-primaryText text-sm !font-medium' }}
            onChange={() => {}}
          />
          <DatePicker
            className="text-primaryText"
            label="Effective Until"
            mode="single"
            theme={{ labelStyle: 'text-primaryText text-sm !font-medium' }}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="flex w-full justify-end my-8">
        <Button variant="primary" className="w-[194px] h-12 !rounded-2xl">
          Add Officer
        </Button>
      </div>
    </Drawer>
  );
};

export default AddOfficerSheet;
