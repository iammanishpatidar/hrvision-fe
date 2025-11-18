import {
  Button,
  Close,
  DatePicker,
  Drawer,
  FileUpload,
  Input,
  Textarea,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';

interface ClaimReimbursementSheetProps {
  isReimbursementSheetOpen: boolean;
  setIsReimbursementSheetOpen: (value: boolean) => void;
  isForClaim?: boolean;
}

const ClaimReimbursementSheet: React.FC<ClaimReimbursementSheetProps> = ({
  isReimbursementSheetOpen,
  setIsReimbursementSheetOpen,
  isForClaim = false,
}) => {
  return (
    <Drawer
      isOpen={isReimbursementSheetOpen}
      onClose={() => setIsReimbursementSheetOpen(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col p-6"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setIsReimbursementSheetOpen(false)}
        >
          <Close />
        </div>
      </div>
      <div className="flex flex-col gap-6 pb-6">
        <Typography
          tag="h3"
          className="font-semibold leading-[32px] text-primary flex items-center justify-between pt-6 pl-0"
        >
          {isForClaim ? 'Claim Reimbursement' : 'View Invoice'}
        </Typography>
      </div>
      <div className="flex flex-col gap-2.5">
        <Input
          label="Amount"
          type="text"
          placeholder="Enter amount"
          theme={{
            labelStyle: '!text-primaryText text-sm !font-medium',
            inputStyle: 'focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
        <DatePicker
          className="text-primaryText"
          label="Date"
          mode="single"
          theme={{ labelStyle: 'text-primaryText text-sm !font-medium' }}
          onChange={() => {}}
        />
        <Textarea
          description="Description"
          placeholder="Add description"
          descriptionClassName="text-sm text-gray-v4 font-medium"
          placeholderClassName="text-sm font-normal"
          textareaClassName="w-full"
          onChange={() => {}}
          value="Travel expenses for client meeting in Delhi on April 5th – includes cab fare and meals."
        />
        <div>
          <label className="text-primaryText text-sm font-medium">Upload Documents</label>
          <FileUpload className="w-full text-primaryText my-2" />
        </div>
      </div>
      <div className="my-10 flex justify-end w-full">
        <Button variant="primary" className="w-[194px] h-12 !rounded-2xl">
          {isForClaim ? 'Send Request' : 'Downnload'}
        </Button>
      </div>
    </Drawer>
  );
};

export default ClaimReimbursementSheet;
