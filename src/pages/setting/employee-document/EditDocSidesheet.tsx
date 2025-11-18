import {
  Close,
  Drawer,
  Input,
  Typography,
  Button,
  Textarea,
  FileUpload,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useEffect, useState } from 'react';
import { EmployeeDocumentColumn } from './constants';

interface EditEmployeeDocumentSideSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedRow: EmployeeDocumentColumn;
}

const EditEmployeeDocumentSideSheet = ({
  isOpen,
  setIsOpen,
  selectedRow,
}: EditEmployeeDocumentSideSheetProps) => {
  const [employeeDocInfo, setEmployeeDocInfo] = useState<EmployeeDocumentColumn>(selectedRow);

  useEffect(() => {
    if (isOpen) {
      setEmployeeDocInfo(selectedRow);
    }
  }, [isOpen, selectedRow]);

  const handleInputChange = (field: keyof EmployeeDocumentColumn, value: string) => {
    setEmployeeDocInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setEmployeeDocInfo(selectedRow);
    setIsOpen(false);
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
        <div className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]" onClick={handleClose}>
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        <Typography tag="h3" className="font-semibold text-primary text-xl pt-4">
          Edit Folder
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
          value={employeeDocInfo?.name}
          onChange={e => handleInputChange('name', e.target.value)}
        />

        {/* <Dropdown
          label="Visible To"
          placeholder="All"
          theme={{
            labelStyle: 'text-primaryText  !mb-1',
            inputStyle: `h-[35px] text-xs placeholder:text-xs focus:border-primary`,
          }}
          options={visibleToOptions}
          selected={{
            label: employeeDocInfo?.visibleTo || '',
            value: employeeDocInfo?.visibleTo || '',
          }}
          onChange={e => {
            if (e?.value) {
              handleInputChange('visibleTo', e.value);
            }
          }}
          formatValue
        /> */}
        <div>
          <label className="text-primaryText block mb-1">Upload Documents</label>
          <FileUpload className="w-full" />
        </div>

        <Textarea
          description="Description (Optional)"
          placeholder="This folder contains all the essential HR-related documents..."
          descriptionClassName="text-sm text-[#7D8592] font-medium"
          placeholderClassName="text-sm font-normal"
          textareaClassName="w-full"
          value={employeeDocInfo?.description}
          onChange={e => handleInputChange('description', e.target.value)}
        />
      </div>

      <div className="flex justify-end mt-6 pr-2">
        <Button
          variant="primary"
          className="rounded-full px-6 py-2"
          onClick={() => {
            console.log('Updated document info:', employeeDocInfo);
          }}
        >
          Save Changes
        </Button>
      </div>
    </Drawer>
  );
};

export default EditEmployeeDocumentSideSheet;
