import {
  Button,
  Close,
  Drawer,
  Input,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';

type PayrollDetailsSheetProps = {
  showPayrollDetailsSheet: boolean;
  setShowPayrollDetailsSheet: (isOpen: boolean) => void;
  selectedPayrollItem: any;
};

const PayrollDetailsSheet: React.FC<PayrollDetailsSheetProps> = ({
  showPayrollDetailsSheet,
  setShowPayrollDetailsSheet,
  selectedPayrollItem,
}) => {
  return (
    <Drawer
      isOpen={showPayrollDetailsSheet}
      onClose={() => setShowPayrollDetailsSheet(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col p-6"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setShowPayrollDetailsSheet(false)}
        >
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto py-6">
        <Typography tag="h3" className="text-primary">
          Payroll Details
        </Typography>
        <div className="space-y-2.5">
          <Input
            label="Month"
            value={selectedPayrollItem?.month}
            type="text"
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle: 'text-sm placeholder:text-sm focus:border-primary text-primaryText',
            }}
          />
          <Input
            label="Date"
            value={selectedPayrollItem?.date}
            type="text"
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle: 'text-sm placeholder:text-sm focus:border-primary text-primaryText',
            }}
          />
          <Input
            label="Net Pay"
            value={selectedPayrollItem?.netPay}
            type="text"
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle: 'text-sm placeholder:text-sm focus:border-primary text-primaryText',
            }}
          />
          <Input
            label="Hike"
            value={selectedPayrollItem?.hike}
            type="text"
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle: 'text-sm placeholder:text-sm focus:border-primary text-primaryText',
            }}
          />
          <Input
            label="Net Salary"
            value={selectedPayrollItem?.netSalary}
            type="text"
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle: 'text-sm placeholder:text-sm focus:border-primary text-primaryText',
            }}
          />
        </div>
        <div className="flex w-full justify-end my-4">
          <Button variant="primary" className="w-[194px] h-12 !rounded-2xl">
            Download
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default PayrollDetailsSheet;
