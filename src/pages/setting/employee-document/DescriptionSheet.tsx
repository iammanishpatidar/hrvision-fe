import {
  Drawer,
  Input,
  Textarea,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import crossIcon from './../../../../assets/temp/crossIcon.svg';
import React, { useState } from 'react';

interface DescriptionSheetProps {
  showDescriptionSheet: boolean;
  onClose: () => void;
  selectedRow: any;
  showAction?: boolean;
}

const DescriptionSheet: React.FC<DescriptionSheetProps> = ({
  showDescriptionSheet,
  onClose,
  selectedRow,
}) => {
  const [isEditing] = useState(false);
  return (
    <Drawer
      isOpen={showDescriptionSheet}
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
        Employement Document Structure
      </Typography>
      <div className="w-full flex flex-col gap-2.5">
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'text-sm',
          }}
          label="Name"
          className="w-full"
          type="text"
          value={selectedRow?.name}
          disabled={!isEditing}
        />
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm',
            inputStyle: 'text-sm',
          }}
          label="End Date"
          className="w-full"
          type="text"
          value={selectedRow?.createdOn}
          disabled={!isEditing}
        />
        <Textarea
          description="Description"
          descriptionClassName="text-sm text-primaryText font-normal"
          textareaClassName="w-full text-sm"
          value={selectedRow?.description}
        />
      </div>
    </Drawer>
  );
};

export default DescriptionSheet;
