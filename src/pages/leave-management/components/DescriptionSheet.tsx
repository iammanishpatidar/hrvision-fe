import { Button, Drawer, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import crossIcon from './../../../../assets/temp/crossIcon.svg';
import React from 'react';
import { formatDateDMY } from '@/utils/formatDate';
import { BusinessLeave } from '../requests/LeaveRequestColumn';

interface DescriptionSheetProps {
  showDescriptionSheet: boolean;
  onClose: () => void;
  selectedRow: BusinessLeave | null;
  showAction?: boolean;
  onAccept: (leaveRequest: BusinessLeave) => void;
  onReject: (leaveRequest: BusinessLeave) => void;
}

const DescriptionSheet: React.FC<DescriptionSheetProps> = ({
  showDescriptionSheet,
  onClose,
  selectedRow,
  showAction,
  onAccept,
  onReject,
}) => {
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
        Leave Request
      </Typography>

      <div className="space-y-2.5 px-[22px] py-[14px] border border-gray-v9 rounded-[14px] w-full mb-6">
        <div className="flex items-center">
          {/* {selectedRow?.avatar && (
            <img
              src={selectedRow.avatar}
              alt={selectedRow?.name}
              className="w-8 h-8 rounded-full mr-3 object-cover"
            />
          )} */}
          <div>
            <div className="font-medium text-xs">{selectedRow?.employee?.name}</div>
            {/* <div className="text-xs text-gray-500 font-normal">{selectedRow?.employee?.role}</div> */}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="text-gray-v1">Employee Id:</div>
          <div>{selectedRow?.employee?.id}</div>
        </div>
        {/* <div className="flex items-center gap-2 text-xs font-medium">
          <div className="text-gray-v1">Department:</div>
          <div>{selectedRow?.department}</div>
        </div> */}
        {/* <div className="flex items-center gap-2 text-xs font-medium">
          <div className="text-gray-v1">Current Manager:</div>
          <div>{selectedRow?.manager}</div>
        </div> */}
      </div>

      <div className="w-full flex flex-col gap-2.5">
        <div className="flex items-center gap-2 font-medium">
          <div className="text-gray-v1">Date:</div>
          <div>{formatDateDMY(selectedRow?.date)}</div>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <div className="text-gray-v1">Type:</div>
          <div>{selectedRow?.leaveTypes?.name}</div>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <div className="text-gray-v1">Reason:</div>
          <div>{selectedRow?.reason}</div>
        </div>
      </div>
      {showAction && (
        <div className="flex justify-between items-center w-full gap-6 mt-10">
          <Button
            variant="primary"
            type="button"
            className="h-input-default !rounded-[14px] w-1/2"
            onClick={() => onReject(selectedRow as BusinessLeave)}
          >
            Reject
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="h-input-default !rounded-[14px] w-1/2"
            onClick={() => onAccept(selectedRow as BusinessLeave)}
          >
            Accept
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default DescriptionSheet;
