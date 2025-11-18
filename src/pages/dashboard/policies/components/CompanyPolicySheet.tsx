import {
  Button,
  Close,
  Drawer,
  Input,
  Textarea,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';

type CompanyPolicySheetProps = {
  showCompanyPolicySheet: boolean;
  setShowCompanyPolicySheet: (value: boolean) => void;
};

const CompanyPolicySheet: React.FC<CompanyPolicySheetProps> = ({
  showCompanyPolicySheet,
  setShowCompanyPolicySheet,
}) => {
  return (
    <Drawer
      isOpen={showCompanyPolicySheet}
      onClose={() => setShowCompanyPolicySheet(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-between p-6 overflow-y-auto"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setShowCompanyPolicySheet(false)}
        >
          <Close />
        </div>
      </div>

      <Typography tag="h3" className="font-semibold text-primary text-xl">
        Company Policy
      </Typography>

      <Input
        label="Policy Name"
        type="text"
        theme={{
          labelStyle: 'text-primaryText ',
          inputStyle:
            'h-[50px] text-sm placeholder:text-primaryText font-normal focus:border-primary rounded-xl',
        }}
        value="HR Policy"
        disabled={true}
      />
      <Input
        label="Upload Date"
        type="text"
        theme={{
          labelStyle: 'text-primaryText ',
          inputStyle:
            'h-[50px] text-sm placeholder:text-primaryText font-normal focus:border-primary rounded-xl',
        }}
        value="06 Mar, 2025"
        disabled={true}
      />
      <Input
        label="End Date"
        type="text"
        theme={{
          labelStyle: 'text-primaryText ',
          inputStyle:
            'h-[50px] text-sm placeholder:text-primaryText font-normal focus:border-primary rounded-xl',
        }}
        value="06 Mar, 2026"
        disabled={true}
      />
      <Input
        label="Uploaded By"
        type="text"
        theme={{
          labelStyle: 'text-primaryText ',
          inputStyle:
            'h-[50px] text-sm placeholder:text-primaryText font-normal focus:border-primary rounded-xl',
        }}
        value="Fin Max"
        disabled={true}
      />

      <div>
        <Textarea
          onChange={() => {}}
          placeholder="Enter policy description"
          description="Description"
          descriptionClassName="text-primaryText"
          value="Outlines key guidelines related to employee behavior, responsibilities, and company policies."
        />
      </div>

      <div className="flex justify-end mt-6 pr-2">
        <Button variant="primary" className="!rounded-2xl w-[194px] h-12">
          Download
        </Button>
      </div>
    </Drawer>
  );
};

export default CompanyPolicySheet;
