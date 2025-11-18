import {
  ISSUE_DESCRIPTION_OPTIONS,
  ISSUE_TYPE_OPTIONS,
  PRIORITY_LEVEL_OPTIONS,
} from '@/pages/assets/mockdata';
import {
  Button,
  Close,
  Drawer,
  Dropdown,
  Input,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';

interface IssueRaisingSheetProps {
  isOpen: boolean;
  onClose: (sheetName: string) => void;
  toggleDrawer: (sheetName: string) => void;
  issueSource: string;
  asset: any;
}

const IssueRaisingSheet: React.FC<IssueRaisingSheetProps> = ({
  isOpen,
  onClose,
  toggleDrawer,
  asset,
  issueSource,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => onClose('notifications')}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col gap-6 p-6"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-custom-blue-v2 p-2 rounded-[14px]"
          onClick={() => toggleDrawer('notifications')}
        >
          <Close />
        </div>
      </div>
      <Typography tag="h3" className="text-primary">
        Raising Issue for:
      </Typography>
      <div className="flex flex-col gap-2">
        <Typography tag="h4" className="text-primary">
          {asset.assetType}
        </Typography>

        <div className="text-gray-600 text-sm">
          {issueSource === 'software' && (
            <div className="flex items-center gap-2">
              <Typography tag="t5" className="text-gray-v3">
                License Type:
              </Typography>
              <Typography tag="t5" className="text-gray-v3 font-normal">
                {asset.licenseType}
              </Typography>
            </div>
          )}
          {issueSource === 'hardware' && (
            <div className="flex items-center gap-2">
              <Typography tag="t5" className="text-gray-v3">
                Asset Name:
              </Typography>
              <Typography tag="t5" className="text-gray-v3 font-normal">
                {asset.name}
              </Typography>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Typography tag="t5" className="text-gray-v3">
              Asset ID:
            </Typography>
            <Typography tag="t5" className="text-gray-v3 font-normal">
              {asset.id}
            </Typography>
          </div>
          {issueSource === 'hardware' && (
            <div className="flex items-center gap-2">
              <Typography tag="t5" className="text-gray-v3">
                Serial Number:
              </Typography>
              <Typography tag="t5" className="text-gray-v3 font-normal">
                {asset.serial}
              </Typography>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Typography tag="t5" className="text-gray-v3">
              Assigned Date:
            </Typography>
            <Typography tag="t5" className="text-gray-v3 font-normal">
              {asset.assignedDate}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Typography tag="t5" className="text-gray-v3">
              Warranty Expiry:
            </Typography>
            <Typography tag="t5" className="text-gray-v3 font-normal">
              {asset.warrantyExpiry}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Typography tag="t5" className="text-gray-v3">
              Current Status:
            </Typography>
            <Typography tag="t5" className="text-gray-v3 font-normal">
              {asset.status}
            </Typography>
          </div>
          {issueSource === 'hardware' && (
            <div className="flex items-center gap-2">
              <Typography tag="t5" className="text-gray-v3">
                Condition:
              </Typography>
              <Typography tag="t5" className="text-gray-v3 font-normal">
                {asset.condition}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Dropdown
          theme={{
            labelStyle: 'input-default text-gray-v4',
            inputStyle: 'h-input-default text-sm',
          }}
          label="Issue Type"
          placeholder="Select issue issueSource"
          options={ISSUE_TYPE_OPTIONS}
        />
        <Input
          type="tel"
          theme={{
            labelStyle: 'input-default text-gray-v4',
            inputStyle: 'h-input-default text-sm',
          }}
          label="Contact Number"
          placeholder="Enter contact number"
        />
        <Dropdown
          theme={{
            labelStyle: 'input-default text-gray-v4',
            inputStyle: 'h-input-default text-sm',
          }}
          label="Priority Level"
          placeholder="Select priority level"
          options={PRIORITY_LEVEL_OPTIONS}
        />
        <Dropdown
          theme={{
            labelStyle: 'input-default text-gray-v4',
            inputStyle: 'h-input-default text-sm',
          }}
          label="Description"
          placeholder="Enter description"
          options={ISSUE_DESCRIPTION_OPTIONS}
        />
      </div>
      <div className="flex items-center justify-end w-full">
        <Button variant="primary" size="medium" className="!rounded-2xl">
          Send Issue
        </Button>
      </div>
    </Drawer>
  );
};

export default IssueRaisingSheet;
