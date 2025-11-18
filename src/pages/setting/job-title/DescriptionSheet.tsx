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
        Job Title
      </Typography>

      {/* <div className="space-y-2.5 px-[22px] py-[14px] border border-gray-v9 rounded-[14px] w-full mb-6">
        <div className="flex items-center">
          {selectedRow?.avatar && (
            <img
              src={selectedRow.avatar}
              alt={selectedRow?.name}
              className="w-8 h-8 rounded-full mr-3 object-cover"
            />
          )}
          <div>
            <div className="font-medium text-xs">{selectedRow?.name}</div>
            <div className="text-xs text-gray-500 font-normal">{selectedRow?.role}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="text-gray-v1">Employee Id:</div>
          <div>{selectedRow?.employeeId}</div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="text-gray-v1">Department:</div>
          <div>{selectedRow?.department}</div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="text-gray-v1">Current Manager:</div>
          <div>{selectedRow?.manager}</div>
        </div>
      </div> */}

      <div className="w-full flex flex-col gap-2.5">
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'text-sm',
          }}
          label="Job Title"
          className="w-full"
          type="text"
          value={selectedRow?.jobTitle}
          disabled={!isEditing}
        />
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm',
            inputStyle: 'text-sm',
          }}
          label="Created On"
          className="w-full"
          type="text"
          value={selectedRow?.createdOn}
          disabled={!isEditing}
        />
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'text-sm',
          }}
          label="Visible To"
          className="w-full"
          type="text"
          value={selectedRow?.visibleTo}
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
