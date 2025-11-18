'use client';

import {
  Close,
  Drawer,
  Input,
  Typography,
  Button,
  Textarea,
  FileUpload,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';

type AddEmployeeDocumentSideSheetProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddEmployeeDocumentSideSheet = ({ isOpen, setIsOpen }: AddEmployeeDocumentSideSheetProps) => {
  const [policyInfo, setPolicyInfo] = useState({
    name: '',
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

  const handleClose = () => {
    setPolicyInfo(prev => ({
      ...prev,
      name: '',
      department: '',
      policyTitle: '',
      policyType: '',
      policyDescription: '',
      effectiveFrom: '',
      effectiveTill: '',
      visibleTo: '',
      uploadDocuments: null,
      acknowledgement: false,
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setPolicyInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-start pl-6 py-6 pr-3"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => {
            setIsOpen(false);
            handleClose();
          }}
        >
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        <Typography tag="h3" className="font-semibold text-primary text-xl pt-4">
          Add Folder
        </Typography>

        <Input
          label="Name"
          type="text"
          placeholder="HR"
          theme={{
            labelStyle: 'text-primaryText ',
            inputStyle:
              'h-[50px] text-sm placeholder:text-[#7D8592] font-normal focus:border-primary rounded-xl',
          }}
          value={policyInfo.name}
          onChange={e => handleInputChange('name', e.target.value)}
        />

        {/* <Dropdown
          label="Visible To"
          placeholder="All"
          theme={{
            labelStyle: 'text-primaryText  !mb-1',
            inputStyle: `h-[35px] text-xs placeholder:text-xs focus:border-primary `,
          }}
          options={visibleToOptions}
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
        /> */}
        <div>
          <label className="text-primaryText block mb-1">Upload Documents</label>
          <FileUpload className="w-full" />
        </div>
        <div className="">
          <Textarea
            description="Description( Optional)"
            placeholder="This folder contains all the essential HR-related documents including onboarding policies, employee handbook, code of conduct, leave policy."
            descriptionClassName="text-sm text-[#7D8592] font-medium"
            placeholderClassName="text-sm font-normal"
            textareaClassName="w-full"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 pr-2">
        <Button variant="primary" className="rounded-full px-6 py-2">
          Add Folder
        </Button>
      </div>
    </Drawer>
  );
};

export default AddEmployeeDocumentSideSheet;
