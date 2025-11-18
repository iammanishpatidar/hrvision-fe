import {
  Button,
  Close,
  Drawer,
  FileUpload,
  Input,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';

type UploadDocumentSideSheetProps = {
  isUploadSheetOpen: boolean;
  setIsUploadSheetOpen: (isOpen: boolean) => void;
  reimbursementData?: {
    date: string;
    category: string;
    amount: string;
    status: 'Approved' | 'Pending' | 'Cancelled';
  }[];
};

const UploadDocumentSideSheet = ({
  isUploadSheetOpen,
  setIsUploadSheetOpen,
}: UploadDocumentSideSheetProps) => {
  return (
    <Drawer
      isOpen={isUploadSheetOpen}
      onClose={() => setIsUploadSheetOpen(false)}
      position="right"
      width="450px"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col pl-6 py-6 pr-3 overflow-y-auto"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setIsUploadSheetOpen(false)}
        >
          <Close />
        </div>
      </div>
      <div className="flex flex-col gap-6 pb-6">
        <Typography tag="h3" className="text-primary flex items-center pt-6 pl-0">
          Upload Documents
        </Typography>
      </div>
      <div className="flex flex-col overflow-y-auto pr-4 gap-3">
        <Input
          label="Document Type"
          type="text"
          placeholder="Offer Letter"
          theme={{
            labelStyle: 'text-primaryText text-sm',
            inputStyle:
              'h-[50px] text-sm placeholder:text-primaryText font-normal focus:border-primary rounded-xl',
          }}
          value=""
        />
        <Input
          label="Document Name"
          type="text"
          placeholder="Offer_letter_cypz"
          theme={{
            labelStyle: 'text-primaryText text-sm',
            inputStyle:
              'h-[50px] text-sm placeholder:text-primaryText font-normal focus:border-primary rounded-xl',
          }}
          value=""
        />
        <FileUpload className="w-full" />
      </div>
      <div className="flex justify-end pr-4">
        <Button
          variant="primary"
          type="button"
          className="rounded-[16px] w-[19px] px-16 py-3 text-base font-semibold font-Poppins mt-10"
          onClick={() => {}}
        >
          Upload
        </Button>
      </div>
    </Drawer>
  );
};

export default UploadDocumentSideSheet;
