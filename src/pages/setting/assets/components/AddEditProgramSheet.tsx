import React, { useState } from 'react';
import {
  Button,
  Drawer,
  Dropdown,
  Input,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import crossIcon from './../../../../../assets/temp/crossIcon.svg';
import { statusOptions } from '../../mockData';

interface AddEditProgramSheetProps {
  showAddProgramSheet: boolean;
  onClose: () => void;
  isToAddProgram?: boolean;
}

const AddEditProgramSheet: React.FC<AddEditProgramSheetProps> = ({
  showAddProgramSheet,
  onClose,
  isToAddProgram,
}) => {
  const [program, setProgram] = useState({
    name: 'Fitflex Club',
    id: '987654',
    type: 'Employee Benefit Club',
    accessLevel: 'All',
    status: 'Active',
    perks: 'Free Gym Access, wellness, sessions',
  });

  return (
    <Drawer
      isOpen={showAddProgramSheet}
      onClose={onClose}
      position="right"
      width="450px"
      className="p-6 rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto"
    >
      <div className="flex justify-end items-center w-full">
        <img
          src={crossIcon}
          alt="crossIcon"
          className="w-11 h-11 cursor-pointer"
          onClick={onClose}
        />
      </div>
      <Typography tag="h3" className="text-primary text-left w-full mb-6">
        {isToAddProgram ? 'Add Program' : 'Edit Program'}
      </Typography>

      <div className="space-y-2.5 w-full">
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="Program Name"
          placeholder="Enter program name"
          className="w-full"
          type="text"
          value={program.name}
          onChange={e => setProgram(prev => ({ ...prev, name: e.target.value }))}
        />
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="Program ID"
          placeholder="Enter program id"
          className="w-full"
          type="text"
          value={program.id}
          onChange={e => setProgram(prev => ({ ...prev, id: e.target.value }))}
        />
        {isToAddProgram && (
          <Input
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle: 'h-12 text-sm font-normal text-primaryText',
            }}
            label="Program Type"
            placeholder="Enter program type"
            className="w-full"
            type="text"
            value={program.type}
            onChange={e => setProgram(prev => ({ ...prev, type: e.target.value }))}
          />
        )}

        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="Access Level"
          placeholder="Enter program access level"
          className="w-full"
          type="text"
          value={program.accessLevel}
          onChange={e => setProgram(prev => ({ ...prev, accessLevel: e.target.value }))}
        />

        <Dropdown
          options={statusOptions}
          label="Status"
          theme={{ labelStyle: 'text-sm font-medium', inputStyle: 'text-primaryText' }}
          selected={{ label: program.status, value: program.status }}
          onChange={e => {
            if (e) {
              setProgram(prev => ({ ...prev, status: e?.value }));
            }
          }}
        />
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="Perks"
          placeholder="Enter program perks"
          className="w-full"
          value={program.perks}
          type="text"
          onChange={e => setProgram(prev => ({ ...prev, perks: e.target.value }))}
        />
      </div>

      <div className="flex justify-end mt-10">
        <Button variant="primary" type="button" className="w-[194px] h-input-default !rounded-2xl">
          Save Program
        </Button>
      </div>
    </Drawer>
  );
};

export default AddEditProgramSheet;
